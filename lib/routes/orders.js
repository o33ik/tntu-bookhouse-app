var orderRoutes = FlowRouter.group({
    prefix: '/orders',
    name: 'orders'
});


orderRoutes.route('/my', {
    name: 'userOrdersList',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'ordersListMainView'});
    }
});

orderRoutes.route('/all', {
    name: 'allOrdersList',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'ordersListMainView'});
    }
});

orderRoutes.route('/:id', {
    name: 'orderView',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'orderViewMainView'});
    }
});