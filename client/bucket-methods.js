AppTntu.bucket = {};

AppTntu.bucket.addItemToBucket = function (bookId) {
    if (Meteor.user()) {
        Meteor.call('addItemToBucket', bookId, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                Materialize.toast('Item was added to the bucket', 3000);
            }
        });
    } else {

    }
};

AppTntu.bucket.changeAmountOfItem = function (bookId, amount) {
    if (Meteor.user()) {
        Meteor.call('changeAmountOfItem', bookId, amount, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    } else {

    }
};

AppTntu.bucket.removeItemFromBucket = function (bookId) {
    if (Meteor.user()) {
        Meteor.call('removeItemFromBucket', bookId, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    } else {

    }
};

AppTntu.bucket.clearBucket = function () {
    if (Meteor.user()) {
        Meteor.call('placeOrderLoggedIn', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                Materialize.toast('Your order was placed', 3000);
            }
        });
    } else {

    }
};

AppTntu.bucket.placeOrder = function () {
    if (Meteor.user()) {
        Meteor.call('placeOrderLoggedIn', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
                FlowRouter.go('userOrdersList', {id: res});
            }
        });
    } else {

    }
};