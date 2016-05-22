Template.publicationsListFilters.onCreated(function () {
});

Template.publicationsListFilters.onRendered(function () {
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            hover: true,
            gutter: 0,
            belowOrigin: true
        }
    );
});

Template.publicationsListFilters.events({
    'click #sort-by a': function (event, tmpl) {
        FlowRouter.setQueryParams({sortBy: event.currentTarget.id});
    },

    'click #sort-direction a': function (event, tmpl) {
        FlowRouter.setQueryParams({sortDirection: event.currentTarget.id});
    },

    'click #availability a': function (event, tmpl) {
        FlowRouter.setQueryParams({availability: event.currentTarget.id});
    }
});