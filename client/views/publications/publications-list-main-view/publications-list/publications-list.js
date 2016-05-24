Template.publicationsList.onRendered(function () {
});

Template.publicationsList.events({
    'click .create-publication-button': function () {
        FlowRouter.go('createPublication');
    }
});