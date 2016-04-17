AppTntu.bucket = {};

AppTntu.bucket.addItemToBucket = function (bookId) {
    if (Meteor.user()) {
        Meteor.call('addItemToBucket', bookId, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
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
        Meteor.call('clearBucket', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    } else {

    }
};

AppTntu.bucket.placeOrder = function () {
    if (Meteor.user()) {
        Meteor.call('clearBucket', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    } else {

    }
};