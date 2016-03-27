Template.publicationsList.events({
    'click .create-publication-button': function () {
        FlowRouter.go('createPublication');
    }
});