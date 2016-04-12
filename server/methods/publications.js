Meteor.methods({
    'createPublication': function (publicationObject, imageBase64, pdfBase64) {
        if (!AppTntu.canUser('createPublication', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        check(publicationObject, AppTntu.documentsCheckers.publication);

        if (imageBase64) {
            var imageId = Images.insert(imageBase64)._id;
            publicationObject.imageId = imageId;
        }

        if (pdfBase64) {
            var pdfId = PublicationsPdf.insert(pdfBase64)._id;
            publicationObject.pdfId = pdfId;
        }

        publicationObject.createdAt = new Date();
        publicationObject.createdBy = Meteor.userId();
        return Publications.insert(publicationObject);
    },

    'editPublication': function (publicationObject, imageBase64, pdfBase64) {
        console.log(Meteor.userId(), this);
        if (!AppTntu.canUser('editPublication', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        console.log(publicationObject);
        check(publicationObject, AppTntu.documentsCheckers.publication);

        if (imageBase64) {
            var imageId = Images.insert(imageBase64)._id;
            publicationObject.imageId = imageId;
        }

        if (pdfBase64) {
            var pdfId = PublicationsPdf.insert(pdfBase64)._id;
            publicationObject.pdfId = pdfId;
        }

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