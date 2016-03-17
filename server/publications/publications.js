Meteor.publish('publications', function (query, options) {
    return Publications.find(query, options);
});