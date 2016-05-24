Template.checkoutCredentialsListMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!AppTntu.canUser('viewCheckoutCredentials', Meteor.userId())) {
            self.redirect();
        }
    });

    this.autorun(function () {
        self.subscribe('checkoutCredentials');
    });
});

Template.checkoutCredentialsListMainView.helpers({
    checkoutCredentials: function () {
        return CheckoutCredentials.find();
    }
});