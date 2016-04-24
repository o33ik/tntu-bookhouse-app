Template.publicationsListMainView.onCreated(function () {
    this.query = new ReactiveVar({});
    var self = this;

    this.autorun(function () {
        var changeQuery = function (query) {
            self.query.set(query);

            var limit = parseInt(FlowRouter.getQueryParam('limit')) || 10;
            var options = {sort: {createdAt: 1}, limit: limit};

            self.subscribe('publications', _.clone(query), options);
        };


        var query = {};
        var authorId = FlowRouter.getQueryParam('authorId');
        if (authorId) {
            query.authorsIds = authorId;
        }
        var type = FlowRouter.getQueryParam('type');
        if (type) {
            query.type = type;
        }

        var searchString = FlowRouter.getQueryParam('search');
        if (searchString) {
            Meteor.call('getAuthorsIdsBySearchString', searchString, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    var regex = {$regex: searchString, $options: 'gim'};
                    query.$or = [
                        {title: regex},
                        {description: regex},
                        {content: regex},
                        {year: regex},
                        {pagesNumber: regex},
                        {price: regex},
                        {isbn: regex},
                        {bbk: regex},
                        {udc: regex},
                        {authorsIds: {$in: res}}
                    ];
                    changeQuery(query);
                }
            });
        } else {
            changeQuery(query);
        }

    });
});

Template.publicationsListMainView.onRendered(function () {
});

Template.publicationsListMainView.helpers({
    publications: function () {
        var query = Template.instance().query.get();
        var options = {sort: {createdAt: 1}};
        return Publications.find(query, options);
    },

    showLoadMoreButton: function () {
        var query = Template.instance().query.get();
        return parseInt(FlowRouter.getQueryParam('limit') || 10)
            <= Publications.find(query).count();
    }
});

Template.publicationsListMainView.events({
    'click .load-more-button': function (event, tmpl) {
        var currLimit = parseInt(FlowRouter.getQueryParam('limit')) || 10;
        FlowRouter.setQueryParams({limit: currLimit + 10});
    }
});