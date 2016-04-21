Meteor.methods({
    'placeOrderLoggedIn': function (deliveryInfo) {
        var userId = this.userId;

        if (!userId) {
            throw new Meteor.Error('Permission Error!',
                'You should be logged in to perfom this action');
        }

        var bucket = Buckets.findOne({userId: userId});

        var items = bucket.addedBooks;
        return placeOrder(items, deliveryInfo, true);
    },

    'placeOrderNotLogged': function (bucketItems, deliveryInfo) {
        // check

        return placeOrder(bucketItems, deliveryInfo);
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


var placeOrder = function (orderItems, deliveryInfo, forRegisteredUser) {
    var generatePaymentInfo = function (items, totalPrice) {
        var templateData = '';
        if (items.length <= 3) {
            var orderItemsAmountAndTitle = _.map(orderItems, function (item) {
                var publication = Publications.findOne(item.id);
                var title = publication ? publication.title : 'undefined';
                return {
                    title: title,
                    amount: item.amount
                }
            });

            templateData = {items: orderItemsAmountAndTitle};
        } else {
            templateData = {itemsAmount: orderItems.length};
        }

        templateData.totalPrice = {};
        var parsedPrice = /(\d+)((\.)(\d+))?/.exec(totalPrice);
        templateData.totalPrice.grn = parsedPrice[1];
        if (parsedPrice[4]) {
            templateData.totalPrice.cop = parsedPrice[4];
        }

        var paymentTemplate = Handlebars.templates['payment-template'];
        return paymentTemplate(templateData);
    };

    var totalPrice = 0;
    _.each(orderItems, function (bucketItem) {
        var publication = Publications.findOne(bucketItem.id);
        totalPrice += (publication ? publication.price : 0) * bucketItem.amount;
    });

    var lastOrder = Orders.findOne({}, {sort: {placedAt: -1}});
    var orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
    var paymentInfo = generatePaymentInfo(orderItems, totalPrice);

    var order = {
        orderNumber: orderNumber,
        placedAt: new Date(),
        items: orderItems,
        totalPrice: totalPrice,
        status: 'placed',
        deliveryInfo: deliveryInfo,
        paymentInfo: paymentInfo
    };

    if (forRegisteredUser) {
        order.userId = Meteor.userId();
    }

    var orderId = Orders.insert(order);
    Meteor.call('clearBucket');
    return orderId;
};