Template.publicationListItem.onCreated(function () {
});

Template.publicationListItem.helpers({});

Template.publicationListItem.events({
    'click .publication-title': function (event, tmpl) {
        FlowRouter.go('viewPublication', {id: tmpl.data.publication._id});
    },
    'click .buy-button': function (event, tmpl) {
        var $button = $(event.currentTarget);
        $button.prop('disabled', true);
        AppTntu.bucket.addItemToBucket(tmpl.data.publication._id);
        setTimeout(function () {
            $button.prop('disabled', false);
        }, 1000);
    }
});