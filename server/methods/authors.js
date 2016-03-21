Meteor.methods({
    'createAuthor': function (author) {
        if (!AppTntu.canUser('createAuthor', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        //check();

        author.createdBy = Meteor.userId();
        author.createdAt = new Date();

        return Authors.insert(author);
    }
});