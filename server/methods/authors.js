import Authors from '/both/collections/authors.js';
import canUser from '/both/user-permissions.js';

Meteor.methods({
    'createAuthor': function (author) {
        if (!canUser('createAuthor', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        //check();

        author.createdBy = Meteor.userId();
        author.createdAt = new Date();

        return Authors.insert(author);
    }
});