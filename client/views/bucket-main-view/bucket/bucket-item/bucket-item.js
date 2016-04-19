Template.bucketListItem.onCreated(function () {
    var self = this;
    this.autorun(function(){
        self.publicationItem =
            new ReactiveVar(Publications.findOne(Template.currentData().bucketItem.id));
    });
});

Template.bucketListItem.helpers({
    publicationItem: function () {
        return Template.instance().publicationItem.get();
    },

    totalBucketPositionPrice: function () {
        var total = this.bucketItem.amount *
            Template.instance().publicationItem.get().price;
        return total;
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