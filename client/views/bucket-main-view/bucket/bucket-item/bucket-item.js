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
        AppTntu.bucket.changeAmountOfItem(tmpl.data.bucketItem.id, newValue);
    },

    'click .delete-icon': function (event, tmpl) {
        AppTntu.bucket.removeItemFromBucket(tmpl.data.bucketItem.id);
    }
});