Meteor.publishComposite('orders', function (orderId) {
    return {
        find: function () {
            var params = {userId: this.userId};
            if (orderId) {
                params._id = orderId;
            }
            return Orders.find(params);
        },
        children: [{
            find: function (order) {
                var ids = _.map(order.items, function (item) {
                    return item.id;
                });
                return Publications.find({_id: {$in: ids}});
            }
        }, {
            find: function (order) {
                return Images.find({_id: order.checkImageId});
            }
        }]
    }
});