var orderRoutes = FlowRouter.group({
    prefix: '/orders',
    name: 'orders'
});


orderRoutes.route('/list/:scope', {
    name: 'ordersList',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'ordersListMainView'});
    }
});

orderRoutes.route('/view/:id', {
    name: 'orderView',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'orderViewMainView'});
    }
});