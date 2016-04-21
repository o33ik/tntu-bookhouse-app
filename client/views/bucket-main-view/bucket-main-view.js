Template.bucketMainView.onCreated(function () {
    var self = this;

    if (Meteor.userId()) {
        this.subscribe('bucket');
    } else {
        var bucketItems = AppTntu.bucket.getBucketItemsFromCookie();
        var bucketItemsIds = _.map(bucketItems, function (item) {
            return item.id;
        });
        this.subscribe('publications', {_id: {$in: bucketItemsIds}});
    }

    this.bucketItems = new ReactiveVar();
    this.autorun(function () {
        if (Meteor.userId()) {
            var bucket = Buckets.findOne();
            var bucketItems = bucket ? bucket.addedBooks : [];
            self.bucketItems.set(bucketItems);
        } else {
            var bucketItems = AppTntu.bucket.getBucketItemsFromCookie();
            self.bucketItems.set(bucketItems);
        }
    });
});

Template.bucketMainView.onRendered(function () {
});

Template.bucketMainView.helpers({
    bucketItems: function () {
        return Template.instance().bucketItems.get();
    }
});

Template.bucketMainView.events({});