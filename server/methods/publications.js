Meteor.methods({
    'createPublication': function (publicationObject) {
        if (!AppTntu.canUser('createPublication', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        check(publicationObject, AppTntu.documentsCheckers.publication);

        publicationObject.createdAt = new Date();
        publicationObject.createdBy = Meteor.userId();
        return Publications.insert(publicationObject);
    },

    'editPublication': function (publicationObject) {
        console.log(Meteor.userId(), this);
        if (!AppTntu.canUser('editPublication', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        check(publicationObject, AppTntu.documentsCheckers.publication);

        publicationObject.lastUpdatedAt = new Date();
        publicationObject.lastUpdatedBy = Meteor.userId();

        return Publications.update(publicationObject._id, {$set: publicationObject});
    },

    'deletePublication': function (publicationId) {
        if (!AppTntu.canUser('deletePublication', Meteor.user())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        return Publications.remove(publicationId);
    }
});