var publicationsRoutes = FlowRouter.group({
    prefix: '/publications',
    name: 'publication',
    triggersEnter: [function (context, redirect) {
        console.log('group publications');
    }]
});


publicationsRoutes.route('/', {
    name: 'publicationsList',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'publicationsList'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('publications list');
    }]
});

publicationsRoutes.route('/:id/view', {
    name: 'viewPublication',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'viewPublication'});
    },
    triggersEnter: [function (context, redirect) {
        console.log('some publication view');
    }]
});

publicationsRoutes.route('/create', {
    name: 'createPublication',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'createEditPublication'});
    },
    triggersEnter: [function (context, redirect) {
        if (!AppTntu.canUser('createPublication', Meteor.userId())) {
            redirect('publicationsList');
        }
        console.log('publication create');
    }]
});

publicationsRoutes.route('/:id/edit', {
    name: 'editPublication',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'createEditPublication'});
    },
    triggersEnter: [function (context, redirect) {
        if (!AppTntu.canUser('editPublication', Meteor.userId())) {
            redirect('publicationsList');
        }
        console.log('some publication edit');
    }]
});