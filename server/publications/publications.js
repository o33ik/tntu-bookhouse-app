Meteor.publishComposite('publications', function (query, options) {
    return {
        find: function () {
            query = query || {};
            options = options || {};
            return Publications.find(query, options);
        },
        children: [
            {
                find: function (publication) {
                    return Authors.find({_id: {$in: publication.authorsIds}});
                }
            }
        ]
    }
});