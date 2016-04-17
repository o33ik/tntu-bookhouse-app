var bucketRoutes = FlowRouter.group({
    prefix: '/bucket',
    name: 'bucket'
});


bucketRoutes.route('/', {
    name: 'bucket',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'bucketMainView'});
    }
});