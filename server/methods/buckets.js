Meteor.methods({
    'addItemToBucket': function (bookId) {
        check(bookId, String);

        changeBucketItem(bookId);
    },

    'changeAmountOfItem': function (bookId, amount) {
        check(bookId, String);
        check(amount, Number);

        changeBucketItem(bookId, amount);
    },

    'removeItemFromBucket': function (bookId) {
        check(bookId, String);

        changeBucketItem(bookId, null, true);
    },

    'clearBucket': function () {
        Buckets.update({userId: Meteor.userId()}, {$set: {addedBooks: []}});
    }
});

var changeBucketItem = function (bookId, amount, remove) {
    var userId = Meteor.userId();

    var targetBucket = Buckets.findOne({userId: userId});
    if (!targetBucket) {
        throw  new Meteor.Error('Invalid data error', 'Invalid bucket id');
    }

    var targetBook = Publications.findOne(bookId);
    if (!targetBook) {
        throw  new Meteor.Error('Invalid data error', 'Invalid book id');
    }


    var existedBookItem = _.find(targetBucket.addedBooks, function (publ) {
        return publ.id == bookId;
    });

    if (existedBookItem) {
        targetBucket.addedBooks =
            _.reject(targetBucket.addedBooks, function (publ) {
                return publ.id == existedBookItem.id;
            });

        if (!remove) {
            existedBookItem.amount = amount || ++existedBookItem.amount;
            targetBucket.addedBooks.push(existedBookItem);
        }
    } else {
        targetBucket.addedBooks.push({
            id: bookId,
            amount: amount || 1,
            addedAt: new Date()
        });
    }

    Buckets.update({_id: targetBucket._id}, {$set: targetBucket});
};