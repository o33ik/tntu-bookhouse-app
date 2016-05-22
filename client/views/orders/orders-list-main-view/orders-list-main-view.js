Template.ordersListMainView.onCreated(function () {
    var self = this;

    this.queryParams = new ReactiveVar({});
    this.sortOptions = new ReactiveVar({});

    this.autorun(function () {
        var query = {};

        var selectedStatuses = FlowRouter.getQueryParam('statuses') || ['waitingConfirmation'];

        query.status = {$in: selectedStatuses};
        self.queryParams.set(query);
    });

    this.autorun(function () {
        var ordersScope = FlowRouter.getParam('scope');

        var query = self.queryParams.get();
        var sortOptions = self.sortOptions.get();
        switch (ordersScope) {
            case 'all':
                self.subscribe('allOrders', query, {sort: sortOptions});
                break;
            case 'my':
                self.subscribe('userOrders', query, {sort: sortOptions});
                break;
        }
    });

    this.autorun(function () {
        var sortBy = FlowRouter.getQueryParam('sortBy') || 'placedAt';
        var sortDirection = FlowRouter.getQueryParam('sortDirection') || 'asc';

        var sortOptions = {};
        sortOptions[sortBy] = sortDirection == 'asc' ? 1 : -1;
        self.sortOptions.set(sortOptions);
    });
});

Template.ordersListMainView.helpers({
    orders: function () {
        var tmpl = Template.instance();

        var query = tmpl.queryParams.get();
        var sortOptions = tmpl.sortOptions.get();
        return Orders.find(query, {sort: sortOptions});
    }
});