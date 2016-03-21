Meteor.methods({
    'createPublication': function (publicationObject) {
        //if (!AppTntu.canUser('createPublication', Meteor.userId())) {
        //    throw new Meteor.Error('You don\'t have permissions to do this!');
        //}

        //check();

        publicationObject.createdAt = new Date();
        publicationObject.createdBy = Meteor.userId() || 'id';
        return Publications.insert(publicationObject);
    },

    'editPublication': function (publicationObject) {
        //if (!AppTntu.canUser('editPublication', Meteor.userId())) {
        //    throw new Meteor.Error('You don\'t have permissions to do this!');
        //}

        // check();

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