Meteor.methods({
    'createPublication': function (publicationObject) {
        //check();

        publicationObject.createdAt = new Date();
        publicationObject.createdBy = new Date();
        return Publications.insert(publicationObject);
    },
    'editPublication': function () {
    },
    'deletePublication': function () {
    }
});