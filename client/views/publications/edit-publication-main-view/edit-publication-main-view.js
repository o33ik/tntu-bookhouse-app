import Publications from '/both/collections/publications.js';
import canUser from '/both/user-permissions.js';

Template.editPublicationMainView.onCreated(function () {
    var self = this;

    this.redirect = _.after(function () {
        FlowRouter.go('publicationsList');
    }, 1);
    this.autorun(function () {
        if (!canUser('editPublication', Meteor.userId())) {
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