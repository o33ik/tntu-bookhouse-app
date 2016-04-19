Meteor.methods({
    'placeOrderLoggedIn': function () {
        var userId = Meteor.userId();

        if (!userId) {
            throw new Meteor.Error('Permission Error!',
                'You should be logged in to perfom this action');
        }

        var bucket = Buckets.findOne({userId: userId});

        var items = bucket.addedBooks;
        var totalPrice = 0;
        _.each(items, function (bucketItem) {
            console.log(bucketItem);
            var publication = Publications.findOne(bucketItem.id);
            console.log(publication.price);
            totalPrice += (publication ? publication.price : 0) * bucketItem.amount;
        });

        var lastOrder = Orders.findOne({}, {sort: {placedAt: -1}});
        var orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

        var order = {
            orderNumber: orderNumber,
            placedAt: new Date(),
            userId: userId,
            items: items,
            totalPrice: totalPrice,
            status: 'placed'
        };

        var orderId = Orders.insert(order);
        Meteor.call('clearBucket');
        return orderId;
    },

    'attachCheckToOrder': function (orderId, imageBase64) {
        // check

        var imageId = Images.insert(imageBase64)._id;

        Orders.update(orderId, {$set: {checkImageId: imageId}});
    },

    'deleteCheckFromOrder': function (orderId) {
        // check

        Orders.update(orderId, {$unset: {checkImageId: false}});
    },

    'confirmOrder': function (orderId) {
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('Permission error', 'You can\'t confirm orders!');
        }

        Orders.update(orderId, {$set: {status: 'paid'}})

    }
});