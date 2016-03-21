Template.editPublicationMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        console.log('You can\'t create publications!');
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!AppTntu.canUser('editPublication', Meteor.userId())) {
            self.redirect();
        }
    });

    this.autorun(function () {
        var publicationId = FlowRouter.getParam('id');
        self.subscribe('publications', {_id: publicationId});
    });
});

Template.editPublicationMainView.helpers({
    publication: function () {
        var publicationId = FlowRouter.getParam('id');
        return Publications.findOne(publicationId);
    }
});