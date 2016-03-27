Template.publicationListItem.onCreated(function () {
});

Template.publicationListItem.helpers({
    publicationImage: function () {
        var image = Images.findOne(this.publication.imageId);
        return image ? image.url() : null;
    }
});

Template.publicationListItem.events({
    'click .publication-title': function (event, tmpl) {
        FlowRouter.go('viewPublication', {id: tmpl.data.publication._id});
    }
});