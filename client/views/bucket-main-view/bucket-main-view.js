import Buckets from '/both/collections/buckets.js';

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
    this.itemsWasChanged = new ReactiveVar(true);
    this.autorun(function () {
        var bucketItems;
        if (Meteor.userId()) {
            var bucket = Buckets.findOne();
            bucketItems = bucket ? bucket.addedBooks : [];
        } else {
            self.itemsWasChanged.get();
            bucketItems = AppTntu.bucket.getBucketItemsFromCookie();
        }
        var sortedItems = _.sortBy(bucketItems, 'addedAt');
        self.bucketItems.set(sortedItems);
    });
});

Template.bucketMainView.onRendered(function () {
});

Template.bucketMainView.helpers({
    bucketItems: function () {
        return Template.instance().bucketItems.get();
    },

    reloadItemsFromTheBucketCb: function () {
        var tmpl = Template.instance();

        return function () {
            var currVal = tmpl.itemsWasChanged.get();
            tmpl.itemsWasChanged.set(!currVal);
        }
    }
});

Template.bucketMainView.events({});