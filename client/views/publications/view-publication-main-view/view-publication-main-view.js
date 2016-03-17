Template.viewPublicationMainView.helpers({
    publication: function () {
        var publicationId = FlowRouter.getParam('id');
        return Publications.findOne(publicationId);
    }
});