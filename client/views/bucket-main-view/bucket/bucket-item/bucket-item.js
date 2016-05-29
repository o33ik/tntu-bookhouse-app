import Publications from '/both/collections/publications.js';
import cookieBucket from '/client/bucket-methods.js';

Template.bucketListItem.onCreated(function () {
    var self = this;
    self.publicationItem = new ReactiveVar({});
    this.autorun(function () {
        self.publicationItem
            .set(Publications.findOne(Template.currentData().bucketItem.id));
    });
});

Template.bucketListItem.helpers({
    publicationItem: function () {
        return Template.instance().publicationItem.get();
    },

    totalBucketPositionPrice: function () {
        var publication = Template.instance().publicationItem.get();
        var price = !_.isEmpty(publication) ? publication.price : 0;
        return this.bucketItem.amount * price;
    }
});

Template.bucketListItem.events({
    'click .title, click .publication-image': function (event, tmpl) {
        FlowRouter.go('viewPublication', {id: tmpl.data.bucketItem.id});
    },

    'change .amount': function (event, tmpl) {
        var newValue = parseInt(event.target.value);
        cookieBucket.changeAmountOfItem(tmpl.data.bucketItem.id, newValue);
        tmpl.data.reloadItemsFromTheBucket();
    },

    'click .delete-icon': function (event, tmpl) {
        cookieBucket.removeItemFromBucket(tmpl.data.bucketItem.id);
        tmpl.data.reloadItemsFromTheBucket();
    }
});