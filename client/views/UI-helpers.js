import moment from 'moment';
import Authors from '/both/collections/authors.js';
import Images from '/client/cfs-collections/images.js';
import PublicationsPdf from '/client/cfs-collections/publications-pdf.js';
import canUser from '/both/user-permissions.js';

UI.registerHelper('isAdmin', function () {
    return Roles.userIsInRole(Meteor.userId(), 'admin')
});

UI.registerHelper('equal', function (param1, param2) {
    return param1 == param2;
});

UI.registerHelper('arrayHasDocuments', function (arrayOrCursor) {
    return _.isArray(arrayOrCursor)
        ? arrayOrCursor.length > 0 : arrayOrCursor.count() > 0;
});

UI.registerHelper('arrayContainsElement', function (arrayOrCursor, element) {
    var array = _.isArray(arrayOrCursor) ? arrayOrCursor : arrayOrCursor.fetch();

    return !!_.find(array, function (itemInArray) {
        return _.isEqual(itemInArray, element);
    });
});

UI.registerHelper('formatDate', function (date, format) {
    format = format || 'DD.MM.YYYY HH:mm';
    return moment(date).format(format);
});


UI.registerHelper('bookAuthorsNames', function (addedAuthorsIds) {
    addedAuthorsIds = addedAuthorsIds || [];
    var authorsNames = Authors.find({_id: {$in: addedAuthorsIds}})
        .map(function (author) {
            return author.name;
        });
    return authorsNames.join(', ');
});

UI.registerHelper('canUser', function (action, group) {
    var userId = Meteor.userId();
    return canUser(action, userId, group);
});


UI.registerHelper('getPublPdfUrlFromId', function (pdfIf) {
    var doc = PublicationsPdf.findOne({_id: pdfIf});
    return doc ? doc.url() : null;
});

UI.registerHelper('getPhotoUrlById', function (imgId) {
    var doc = Images.findOne({_id: imgId});
    return doc ? doc.url() : null;
});

UI.registerHelper('roundPrice', function (price) {
    return Math.round(price * 100) / 100;
});