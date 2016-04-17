Template.bucketMainView.onCreated(function () {
    this.subscribe('bucket');
});

Template.bucketMainView.onRendered(function () {
});

Template.bucketMainView.helpers({
    bucketItems: function () {
        if (Meteor.userId()) {
            var bucket = Buckets.findOne({userId: Meteor.userId()});
            return bucket ? _.sortBy(bucket.addedBooks, 'addedAt') : [];
        }
    }
});

Template.bucketMainView.events({});