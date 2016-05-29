import CheckoutCredentials from '/both/collections/checkout-credentials.js';

Template.checkoutCredentialsEditMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!AppTntu.canUser('editCheckoutCredentials', Meteor.userId())) {
            self.redirect();
        }
    });

    this.autorun(function () {
        var checkoutCredentialsId = FlowRouter.getParam('id');

        self.subscribe('checkoutCredentials', checkoutCredentialsId);
    });
});

Template.checkoutCredentialsEditMainView.helpers({
    checkoutCredentials: function () {
        var checkoutCredentialsId = FlowRouter.getParam('id');
        return CheckoutCredentials.findOne(checkoutCredentialsId);
    }
});