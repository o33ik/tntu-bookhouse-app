Template.checkoutCredentialsListItem.events({
    'click tr': function (event, tmpl) {
        FlowRouter.go('checkoutCredentialsEdit', {id: tmpl.data._id});
    }
});