var publicationsRoutes = FlowRouter.group({
    prefix: '/news',
    name: 'news',
    triggersEnter: [function(context, redirect) {
        console.log('group news');
    }]
});


publicationsRoutes.route('/', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'newsList'});
    },
    triggersEnter: [function(context, redirect) {
        console.log('news list');
    }]
});

publicationsRoutes.route('/:id', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'viewNews'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('some news view');
    }]
});

publicationsRoutes.route('/:id/create', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'createEditNews'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('publication create');
    }]
});

publicationsRoutes.route('/:id/edit', {
    action: function() {
        BlazeLayout.render('mainLayout', {content: 'createEditPublication'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('some news edit');
    }]
});