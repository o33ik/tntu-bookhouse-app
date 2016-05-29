import Publications from '/both/collections/publications.js';
import notify from '/client/notify.js';

Template.publicationsListMainView.onCreated(function () {
    this.query = new ReactiveVar({});
    this.sortOptions = new ReactiveVar({});

    var self = this;

    this.autorun(function () {
        var changeQuery = function (query) {
            self.query.set(query);

            var limit = parseInt(FlowRouter.getQueryParam('limit')) || 10;
            var sortOptions = self.sortOptions.get();
            var options = {sort: sortOptions, limit: limit};

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

        var availability = FlowRouter.getQueryParam('availability');
        if (availability == 'hidden') {
            query.isHidden = true;
        } else if (!availability || availability == 'available') {
            query.isHidden = {$ne: true};
        }

        // if search string exist, need to get authors ids by name(search string) via server method
        var searchString = FlowRouter.getQueryParam('search');
        if (searchString) {
            Meteor.call('getAuthorsIdsBySearchString', searchString, function (err, res) {
                if (err) {
                    notify(err.message);
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

    this.autorun(function () {
        var sortBy = FlowRouter.getQueryParam('sortBy') || 'createdAt';
        var sortDirection = FlowRouter.getQueryParam('sortDirection');

        var sortOptions = {};
        sortOptions[sortBy] = sortDirection == 'asc' ? 1 : -1;
        self.sortOptions.set(sortOptions);
    });
});

Template.publicationsListMainView.onRendered(function () {
});

Template.publicationsListMainView.helpers({
    publications: function () {
        var tmpl = Template.instance();

        var query = tmpl.query.get();
        var options = {sort: tmpl.sortOptions.get()};
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