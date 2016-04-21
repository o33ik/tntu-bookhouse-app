Meteor.publishComposite('orders', function (id) {
    return {
        find: function () {
            var params = {};
            if (Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
            } else if (this.userId) {
                params.userId = this.userId;
            } else if (id) {
                params.userId = {$exists: false};
                params._id = id;
            } else {
                return this.ready();
            }

            if (id) {
                params._id = id;
            }

            return Orders.find(params);
        },
        children: childPublishes
    }
});

var childPublishes = [{
    find: function (order) {
        var ids = _.map(order.items, function (item) {
            return item.id;
        });
        return Publications.find({_id: {$in: ids}});
    },
    children: [{
        find: function (publication) {
            return Images.find({_id: publication.imageId});
        }
    }]
}, {
    find: function (order) {
        return Images.find({_id: order.checkImageId});
    }
}
];