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
    return AppTntu.canUser(action, userId, group);
});


UI.registerHelper('getPublPdfUrlFromId', function (pdfIf) {
    var doc = PublicationsPdf.findOne({_id: pdfIf});
    return doc ? doc.url() : null;
});

UI.registerHelper('getPublImageUrlFromId', function (imgId) {
    var doc = Images.findOne({_id: imgId});
    return doc ? doc.url() : null;
});