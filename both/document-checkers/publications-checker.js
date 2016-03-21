var PublicationChecker = Match.Where(function (publication) {
    check(publication, {
        _id: String,
        title: String,
        description: Match.Optional(String),
        year: Match.Where(function (year) {
            return /^\d{4}$/.test(year);
        }),
        pagesNumber: Match.Where(function(pagesNumber){
            return parseInt(pagesNumber) > 0;
        }),
        content: Match.Optional(String),
        price: Match.Where(function (price){
            return /^\d+(.\d{2})?$/.test(price);
        }),
        createdBy: Match.Optional(String),
        lastUpdatedBy: Match.Optional(String),
        createdAt: Match.Optional(Date),
        lastUpdatedAt: Match.Optional(Date),
        authorsIds: [String]
    });

    return true;
});

Meteor.startup(function () {
    AppTntu.documentsCheckers = AppTntu.documentsCheckers || {};
    AppTntu.documentsCheckers.publication = PublicationChecker;
});