Meteor.methods({
    'getAuthorsIdsBySearchString': function (string) {
        var authors = Authors.find({name: {$regex: string, $options: 'gi'}});
        return authors.map(function (author) {
            return author._id;
        })
    }
});