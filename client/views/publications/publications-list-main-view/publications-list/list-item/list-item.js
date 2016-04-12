Template.publicationListItem.onCreated(function () {
});

Template.publicationListItem.helpers({});

Template.publicationListItem.events({
    'click .publication-title': function (event, tmpl) {
        FlowRouter.go('viewPublication', {id: tmpl.data.publication._id});
    }
});