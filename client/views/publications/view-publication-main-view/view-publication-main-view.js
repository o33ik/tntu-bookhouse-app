Template.viewPublicationMainView.onCreated(function () {
    var self = this;
    this.autorun(function () {
        var publicationId = FlowRouter.getParam('id');
        self.subscribe('publications', {_id: publicationId});
    });
});

Template.viewPublicationMainView.helpers({
    publication: function () {
        var publicationId = FlowRouter.getParam('id');
        return Publications.findOne(publicationId);
    }
});