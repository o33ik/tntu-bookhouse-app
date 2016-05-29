import canUser from '/both/user-permissions.js';

Template.checkoutCredentialsCreateMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!canUser('addCheckoutCredentials', Meteor.userId())) {
            self.redirect();
        }
    });
});