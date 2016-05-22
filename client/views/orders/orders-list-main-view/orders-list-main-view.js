Template.ordersListMainView.onCreated(function () {
    var self = this;

    this.queryParams = new ReactiveVar({});
    this.sortOptions = new ReactiveVar({});

    this.autorun(function () {

    });

    this.autorun(function () {
        var ordersScope = FlowRouter.getParam('scope');
        switch (ordersScope) {
            case 'all':
                self.subscribe('allOrders');
                break;
            case 'my':
                self.subscribe('userOrders');
                break;
        }

    });
});

Template.ordersListMainView.helpers({
    orders: function () {
        return Orders.find({}, {sort: {placedAt: -1}});
    }
});