var checkoutCredentialsRoutes = FlowRouter.group({
    prefix: '/checkout-credentials',
    name: 'orders'
});


checkoutCredentialsRoutes.route('/list', {
    name: 'checkoutCredentialsList',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'checkoutCredentialsListMainView'});
    }
});

checkoutCredentialsRoutes.route('/create', {
    name: 'checkoutCredentialsCreate',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'checkoutCredentialsCreateMainView'});
    }
});

checkoutCredentialsRoutes.route('/edit/:id', {
    name: 'checkoutCredentialsEdit',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'checkoutCredentialsEditMainView'});
    }
});