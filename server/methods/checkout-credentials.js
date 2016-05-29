import CheckoutCredentials from '/both/collections/checkout-credentials.js';

Meteor.methods({
    'addNewCheckoutCredentials': function (data) {
        if (!AppTntu.canUser('addCheckoutCredentials', this.userId)) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }
        var id = CheckoutCredentials.insert(data);
        Meteor.call('setActiveCheckoutCredentials', id);
        return id;
    },

    'editCheckoutCredentials': function (data) {
        if (!AppTntu.canUser('addCheckoutCredentials', this.userId)) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }

        if (data.isActive) {
            _.omit(data, 'isActive');
            Meteor.call('setActiveCheckoutCredentials', data._id);
        }

        CheckoutCredentials.update({_id: data._id}, {$set: data});
    },

    'removeCheckoutCredentials': function (id) {
        if (!AppTntu.canUser('addCheckoutCredentials', this.userId)) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }
        CheckoutCredentials.remove(id);
    },

    'setActiveCheckoutCredentials': function (id) {
        if (!AppTntu.canUser('addCheckoutCredentials', this.userId)) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }
        CheckoutCredentials.update({isActive: true}, {$set: {isActive: false}});
        CheckoutCredentials.update(id, {$set: {isActive: true}});
    }
});