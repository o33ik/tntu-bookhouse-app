import Publications from '/both/collections/publications.js';
import PublicationsPdf from '/server/cfs-collections/publications-pdf.js';
import Images from '/server/cfs-collections/images.js';
import publicationChecker from '/both/document-checkers/publications-checker.js';
import canUser from '/both/user-permissions.js';

Meteor.methods({
    'createPublication': function (publicationObject, imageBase64, pdfBase64) {
        if (!canUser('createPublication', Meteor.userId())) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }

        check(publicationObject, publicationChecker);

        if (imageBase64) {
            publicationObject.imageId = Images.insert(imageBase64)._id;
        }

        if (pdfBase64) {
            publicationObject.pdfId = PublicationsPdf.insert(pdfBase64)._id;
        }

        publicationObject.createdAt = new Date();
        publicationObject.createdBy = Meteor.userId();
        return Publications.insert(publicationObject);
    },

    'editPublication': function (publicationObject, imageBase64, pdfBase64) {
        if (!canUser('editPublication', Meteor.userId())) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }

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

    'changePublicationStatus': function (publicationId, shouldBeHidden) {
        if (!canUser('changePublicationStatus', Meteor.user())) {
            throw new Meteor.Error('Permission Error', 'You don\'t have permissions to do this!');
        }

        var modifier = {};
        if (shouldBeHidden) {
            modifier.$set = {isHidden: true};
        } else {
            modifier.$unset = {isHidden: false};
        }
        Publications.update(publicationId, modifier);
    }
});