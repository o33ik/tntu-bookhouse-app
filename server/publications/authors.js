import Authors from '/both/collections/authors.js';

Meteor.publish('authors', function (query, options) {
    query = query || {};
    options = options || {};
    return Authors.find(query, options);
});