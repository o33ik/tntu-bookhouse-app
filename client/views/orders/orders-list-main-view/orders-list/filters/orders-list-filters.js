Template.ordersListFilters.onCreated(function () {});

Template.ordersListFilters.onRendered(function () {
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            hover: true,
            gutter: 0,
            belowOrigin: true
        }
    );
});

Template.ordersListFilters.helpers({
    selectedStatuses: function () {
        return FlowRouter.getQueryParam('statuses') || [];
    }
});

Template.ordersListFilters.events({
    'click #sort-by a': function (event, tmpl) {
        FlowRouter.setQueryParams({sortBy: event.currentTarget.id});
    },

    'click #sort-direction a': function (event, tmpl) {
        FlowRouter.setQueryParams({sortDirection: event.currentTarget.id});
    },

    'change #status input': function (event, tmpl) {
        var $checkedItems = tmpl.$('#status input:checked');
        var statues = _.map($checkedItems, function ($checkbox) {
            return $checkbox.id;
        });
        FlowRouter.setQueryParams({statuses: statues});
    }
});