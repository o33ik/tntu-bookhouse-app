Template.checkoutCredentialsList.events({
    'click .add-new-credentials-button': function (event, tmpl) {
        FlowRouter.go('checkoutCredentialsCreate');
    }
});