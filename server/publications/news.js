Meteor.publish('news', function (query, options) {
    return News.find(query, options);
});