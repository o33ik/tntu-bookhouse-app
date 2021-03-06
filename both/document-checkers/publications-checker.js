export default Match.Where(function (publication) {
    check(publication, {
        _id: Match.Optional(String),
        title: String,
        type: Match.OneOf('monographs', 'conferenceMaterials', 'studiesPublications',
            'socioPoliticalPublications', 'literaryAndArtPublication', 'other'),
        description: Match.Optional(String),
        year: Match.Where(function (year) {
            return /^\d{4}$/.test(year);
        }),
        pagesNumber: Match.Where(function (pagesNumber) {
            return parseInt(pagesNumber) > 0;
        }),
        content: Match.Optional(String),
        price: Match.Where(function (price) {
            return /^\d+(.\d{2})?$/.test(price);
        }),
        createdBy: Match.Optional(String),
        lastUpdatedBy: Match.Optional(String),
        createdAt: Match.Optional(Date),
        lastUpdatedAt: Match.Optional(Date),
        authorsIds: [String],
        isHidden: Match.Optional(Boolean),

        isbn: String,
        udc: String,
        bbk: String
    });

    return true;
});