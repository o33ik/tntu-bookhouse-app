var publicationsRoutes = FlowRouter.group({
    prefix: '/publications',
    name: 'publication'
});


publicationsRoutes.route('/', {
    name: 'publicationsList',
    action: function (params, query) {
        BlazeLayout.render('mainLayout', {content: 'publicationsListMainView'});
    }
});

publicationsRoutes.route('/:id/view', {
    name: 'viewPublication',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'viewPublicationMainView'});
    }
});

publicationsRoutes.route('/create', {
    name: 'createPublication',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'createPublicationMainView'});
    }
});

publicationsRoutes.route('/:id/edit', {
    name: 'editPublication',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'editPublicationMainView'});
    }
});