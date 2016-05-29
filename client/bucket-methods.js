import notify from '/client/notify.js';
var bucket = {};

bucket.addItemToBucket = function (bookId) {
    if (Meteor.user()) {
        Meteor.call('addItemToBucket', bookId, function (err, res) {
            if (err) {
                notify(err.message);
            } else {
                Materialize.toast('Item was added to the bucket', 3000);
            }
        });
    } else {
        changeBucketInCookie(bookId);
    }
};

bucket.changeAmountOfItem = function (bookId, amount) {
    if (Meteor.user()) {
        Meteor.call('changeAmountOfItem', bookId, amount, function (err, res) {
            if (err) {
                notify(err.message);
            }
        });
    } else {
        changeBucketInCookie(bookId, amount);
    }
};

bucket.removeItemFromBucket = function (bookId) {
    if (Meteor.user()) {
        Meteor.call('removeItemFromBucket', bookId, function (err, res) {
            if (err) {
                notify(err.message);
            } else {
                Materialize.toast('Item was removed from the bucket', 3000);
            }
        });
    } else {
        changeBucketInCookie(bookId, 0, true);
    }
};

bucket.clearBucket = function () {
    if (Meteor.user()) {
        Meteor.call('clearBucket', function (err, res) {
            if (err) {
                notify(err.message);
            } else {
                Materialize.toast('Bucket was cleared', 3000);
            }
        });
    } else {
        Cookie.remove('bucket');
    }
};

bucket.placeOrder = function () {
    var openPlaceOrderModal = function () {
        var data = {
            onConfirm: function (deliveryInfo) {
                createOrder(deliveryInfo);
            }
        };
        var parentNode = $('body')[0];
        Blaze.renderWithData(Template.placeOrderModal, data, parentNode);
    };

    var createOrder = function (deliveryInfo) {
        if (Meteor.user()) {
            Meteor.call('placeOrderLoggedIn', deliveryInfo, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    FlowRouter.go('orderView', {id: res});
                }
            });
        } else {
            var bucketItems = bucket.getBucketItemsFromCookie();
            Meteor.call('placeOrderNotLogged', bucketItems, deliveryInfo,
                function (err, res) {
                    if (err) {
                        notify(err.message);
                    } else {
                        bucket.clearBucket();
                        FlowRouter.go('orderView', {id: res});
                        addOrderIdToCookie(res);
                    }
                });
        }
    };

    openPlaceOrderModal();
};

bucket.getBucketItemsFromCookie = function () {
    var rawValue = Cookie.get('bucket');
    return rawValue ? JSON.parse(rawValue) : [];
};

var changeBucketInCookie = function (bookId, amount, remove) {
    var itemsInBucket = bucket.getBucketItemsFromCookie();
    itemsInBucket = _.isArray(itemsInBucket) ? itemsInBucket : [];

    var existedItem = _.find(itemsInBucket, function (itemItem) {
        return itemItem.id == bookId;
    });
    var alreadyAdded = !!existedItem;


    if (alreadyAdded) {
        itemsInBucket = _.reject(itemsInBucket, function (it) {
            return it.id == existedItem.id;
        });
    } else {
        existedItem = {id: bookId, amount: 1, addedAt: new Date()};
    }

    if (!remove) {
        if (amount) {
            existedItem.amount = amount;
        } else if (alreadyAdded) {
            existedItem.amount++;
        }
        itemsInBucket.push(existedItem);
        Materialize.toast('Item was added to the bucket', 3000);
    } else {
        Materialize.toast('Item was removed from the bucket', 3000);
    }
    Cookie.set('bucket', JSON.stringify(itemsInBucket));
};

var addOrderIdToCookie = function (id) {
    var str = Cookie.get('ordersIds');
    var currentOrdersIds = str ? JSON.parse(str) : [];
    currentOrdersIds.push(id);
    Cookie.set('ordersIds', JSON.stringify(currentOrdersIds));
};

export default bucket;