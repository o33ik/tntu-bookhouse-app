FlowRouter.route('/about', {
    name: 'about',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'aboutPage'});
    }
});

FlowRouter.route('/authors-info', {
    name: 'authors-info',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'forAuthors'});
    }
});

FlowRouter.route('/customer-info', {
    name: 'customer-info',
    action: function () {
        BlazeLayout.render('mainLayout', {content: 'forCustomers'});
    }
});