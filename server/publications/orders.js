Meteor.publishComposite('orderItem', function (id) {
    return {
        find: function () {
            var params = {_id: id};
            var isAdmin = Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP);

            if (!isAdmin) {
                params.userId = {$exists: false};
                if (this.userId && !isAdmin) {
                    params.userId = this.userId;
                } else if (!isAdmin) {
                    params.userId = {$exists: false};
                } else {
                    return this.ready();
                }
            }

            return Orders.find(params);
        },
        children: childPublishes
    }
});

Meteor.publishComposite('userOrders', function (params, options) {
    return {
        find: function () {
            var isAdmin = Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP);

            if (!isAdmin) {
                if (this.userId) {
                    params.userId = this.userId;
                } else {
                    params.userId = {$exists: false};
                }
            }

            return Orders.find(params, options);
        },
        children: childPublishes
    }
});

// for admins
Meteor.publishComposite('allOrders', function (params, options) {
    return {
        find: function () {
            if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
                return this.ready();
            }

            return Orders.find(params, options);
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
}];