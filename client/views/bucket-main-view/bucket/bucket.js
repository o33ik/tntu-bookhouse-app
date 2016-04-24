Template.bucket.onCreated(function () {
});

Template.bucket.onRendered(function () {
});

Template.bucket.helpers({
    totalBucketPrice: function () {
        var totalPrice = 0;
        _.each(this.bucketItems, function (bucketItem) {
            var publication = Publications.findOne(bucketItem.id);
            totalPrice += (publication ? publication.price : 0) * bucketItem.amount;
        });
        return totalPrice;
    },
    reloadItemsFromTheBucket: function () {
        return Template.instance().data.reloadItemsFromTheBucket;
    }
});

Template.bucket.events({
    'click .clear-bucket-button': function (event, tmpl) {
        AppTntu.bucket.clearBucket();
        tmpl.data.reloadItemsFromTheBucket();
    },

    'click .place-order-button': function () {
        AppTntu.bucket.placeOrder();
    }
});