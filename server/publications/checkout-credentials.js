import CheckoutCredentials from '/both/collections/checkout-credentials.js';

Meteor.publish('checkoutCredentials', function (id) {
    if (!AppTntu.canUser('addCheckoutCredentials', this.userId)) {
        return this.ready();
    }

    var query = {};
    if (id) {
        query._id = id;
    }

    return CheckoutCredentials.find(query);
});