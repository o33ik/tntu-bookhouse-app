Template.findOrderForm.events({
    'submit form': function (event, tmpl) {
        event.preventDefault();

        var value = tmpl.$('input').val();
        FlowRouter.setQueryParams({phoneNumber: value});
    }
});