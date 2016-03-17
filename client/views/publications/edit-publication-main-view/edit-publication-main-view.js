Template.editPublicationMainView.onCreated(function () {
    var self = this;

    this.autorun(function () {
        if (!AppTntu.canUser('editPublication', Meteor.userId())) {
            console.log('You can\'t edit publications!');
            FlowRouter.go('publicationsList');
        }
    });
});

Template.editPublicationMainView.helpers({
    publication: function () {
        var publicationId = FlowRouter.getParam('id');
        return Publications.findOne(publicationId);
    }
});