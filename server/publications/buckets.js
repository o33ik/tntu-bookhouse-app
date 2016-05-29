import Publications from '/both/collections/publications.js';
import Buckets from '/both/collections/buckets.js';
import Images from '/server/cfs-collections/images.js';

Meteor.publishComposite('bucket', function () {
    return {
        find: function () {
            var userId = this.userId;
            return Buckets.find({userId: userId});
        },
        children: [{
            find: function (bucket) {
                var publsIds = _.map(bucket.addedBooks, function (addedBook) {
                    return addedBook.id;
                });
                return Publications.find({_id: {$in: publsIds}});
            },
            children: [{
                find: function(publication) {
                    return Images.find(publication.imageId);
                }
            }]
        }]
    }
});