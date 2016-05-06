Meteor.methods({
    'createPublication': function (publicationObject, imageBase64, pdfBase64) {
        if (!AppTntu.canUser('createPublication', Meteor.userId())) {
            throw new Meteor.Error('You don\'t have permissions to do this!');
        }

        check(publicationObject, AppTntu.documentsCheckers.publication);

        if (imageBase64) {
            publicationObject.imageId = uploadImage(imageBase64);
        }

        if (pdfBase64) {
            publicationObject.pdfId = uploadPdf(pdfBase64);
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

        check(publicationObject, AppTntu.documentsCheckers.publication);

        var targetPublication = Publications.findOne(publicationObject._id);

        if (imageBase64) {
            publicationObject.imageId = Images.insert(imageBase64)._id;
            Images.remove(targetPublication.imageId);
        }

        if (pdfBase64) {
            publicationObject.pdfId = PublicationsPdf.insert(pdfBase64)._id;
            PublicationsPdf.remove(targetPublication.pdfId);
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