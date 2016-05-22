Template.publicationsList.onRendered(function () {
    this.$('.dropdown-button').dropdown({
        belowOrigin: true
    });
});

Template.publicationsList.events({
    'click .create-publication-button': function () {
        FlowRouter.go('createPublication');
    }
});