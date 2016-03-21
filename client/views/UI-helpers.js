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