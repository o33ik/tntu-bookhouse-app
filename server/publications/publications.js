Meteor.publish('publications', function (query, options) {
    query = query || {};
    options = options || {};
    return Publications.find(query, options);
});