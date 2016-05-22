Template.publicationsListFilters.onCreated(function () {
});

Template.publicationsListFilters.onRendered(function () {
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
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