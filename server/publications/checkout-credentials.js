import CheckoutCredentials from '/both/collections/checkout-credentials.js';
import canUser from '/both/user-permissions.js';

Meteor.publish('checkoutCredentials', function (id) {
    if (!canUser('addCheckoutCredentials', this.userId)) {
        return this.ready();
    }

    var query = {};
    if (id) {
        query._id = id;
    }

    return CheckoutCredentials.find(query);
});