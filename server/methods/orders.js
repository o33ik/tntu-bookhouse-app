import Orders from '/both/collections/orders.js';
import Publications from '/both/collections/publications.js';
import CheckoutCredentials from '/both/collections/checkout-credentials.js';
import Buckets from '/both/collections/buckets.js';
import Images from '/server/cfs-collections/images.js';
import { Email } from 'meteor/email';

Meteor.methods({
    'placeOrderLoggedIn': function (deliveryInfo) {
        var userId = this.userId;

        if (!userId) {
            throw new Meteor.Error('Permission Error!',
                'You should be logged in to perform this action');
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

        return Orders.update(orderId, {$set: {checkImageId: imageId, status: 'waitingConfirmation'}});
    },

    'deleteCheckFromOrder': function (orderId) {
        // check

        Orders.update(orderId, {$unset: {checkImageId: false}, $set: {status: 'placed'}});
    },

    'confirmOrder': function (orderId, ttn) {
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('Permission error', 'You can\'t confirm orders!');
        }

        return confirmOrder(orderId, ttn);
    }
});


var placeOrder = function (orderItems, deliveryInfo, forRegisteredUser) {
    var computeTotalPrice = function (orderItems) {
        var totalPrice = 0;
        _.each(orderItems, function (bucketItem) {
            var publication = Publications.findOne(bucketItem.id);
            totalPrice += (publication ? publication.price : 0) * bucketItem.amount;
        });
        return totalPrice;
    };

    var generatePaymentInfoHtml = function (items, totalPrice) {
        var templateData = {};
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

        totalPrice = Math.round(totalPrice * 100) / 100;
        templateData.totalPrice = {};
        var parsedPrice = /(\d+)((\.)(\d+))?/.exec(totalPrice);
        templateData.totalPrice.grn = parsedPrice[1];
        if (parsedPrice[4]) {
            templateData.totalPrice.cop = parsedPrice[4];
        }

        var checkoutCredentials = CheckoutCredentials.findOne({isActive: true});
        checkoutCredentials = _.pick(checkoutCredentials, 'account', 'mfo', 'code', 'bankName', 'receiver');

        _.extend(templateData, checkoutCredentials);

        var paymentTemplate = Handlebars.templates['payment-template'];
        return paymentTemplate(templateData);
    };

    var sendEmail = function (orderId) {
        var generateEmailHtml = function (order) {
            var rootUrl = process.env.ROOT_URL;
            if (!/\/$/.test(rootUrl)) {
                rootUrl = rootUrl + '/';
            }
            var orderUrl = rootUrl + 'orders/view/' + orderId;

            var paymentInfoHtml = order.paymentInfo;

            var templateData = {
                orderURL: orderUrl,
                paymentInfo: paymentInfoHtml
            };

            var mailTemplate = Handlebars.templates['order-created-email-template'];
            return mailTemplate(templateData);
        };

        var order = Orders.findOne(orderId);

        Email.send({
            to: order.deliveryInfo.email,
            from: 'tntu@bookhouse.com',
            subject: 'Замовлення',
            html: generateEmailHtml(order)
        });
    };

    var totalPrice = computeTotalPrice(orderItems);
    var paymentInfo = generatePaymentInfoHtml(orderItems, totalPrice);

    var order = {
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

    sendEmail(orderId);

    Meteor.call('clearBucket');
    return orderId;
};

var confirmOrder = function (orderId, ttn) {
    var sendMail = function (orderId) {
        var generateEmailHtml = function (order) {
            var rootUrl = process.env.ROOT_URL;
            if (!/\/$/.test(rootUrl)) {
                rootUrl = rootUrl + '/';
            }
            var orderUrl = rootUrl + 'orders/view/' + order._id;


            var templateData = {
                orderURL: orderUrl,
                novaPostaTrackUrl: `https://novaposhta.ua/tracking/?cargo_number=${order.ttn}`,
                ttn: order.ttn
            };

            var mailTemplate = Handlebars.templates['order-confirmed-email-template'];
            return mailTemplate(templateData);
        };

        var targetOrder = Orders.findOne(orderId);

        Email.send({
            to: targetOrder.deliveryInfo.email,
            from: 'tntu@bookhouse.com',
            subject: 'Замовлення підтверджено',
            html: generateEmailHtml(targetOrder)
        });
    };

    Orders.update(orderId, {$set: {status: 'paid', ttn: ttn}});
    sendMail(orderId);
};