Template.checkoutCredentialsCreateMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        console.log('You can\'t add checkout credentials!');
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!AppTntu.canUser('addCheckoutCredentials', Meteor.userId())) {
            self.redirect();
        }
    });
});