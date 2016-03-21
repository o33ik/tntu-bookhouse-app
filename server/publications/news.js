Meteor.publish('news', function (query, options) {
    query = query || {};
    options = options || {};
    return News.find(query, options);
});