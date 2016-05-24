Template.topNavBar.onRendered(function () {
    this.$(".button-collapse").sideNav();
    this.$('.collapsible').collapsible();

    this.closeSideNav = function () {
        var $sideNavButton = this.$('.button-collapse');
        $sideNavButton.sideNav('hide');
    }
});

Template.topNavBar.helpers({
    activeMenuItem: function () {
        return;
    }
});

Template.topNavBar.events({
    'click .flag-icon': function (event, tmpl) {
        var selectedLanguage = event.currentTarget.id;
        TAPi18n.setLanguage(selectedLanguage);
    },

    'click .side-menu #all-publications': function (event, tmpl) {
        FlowRouter.go('publicationsList');
        tmpl.closeSideNav();
    },

    'click .side-menu .publications': function (event, tmpl) {
        var selectedMenuItem = event.target.id;
        FlowRouter.go('publicationsList', {}, {type: selectedMenuItem});
        tmpl.closeSideNav();
    },

    'click .side-menu .info': function (event, tmpl) {
        var selectedMenuItem = event.target.id;
        FlowRouter.go(selectedMenuItem);
        tmpl.closeSideNav();
    },

    'click .orders': function (event, tmpl) {
        var scope = Roles.userIsInRole(Meteor.userId(), 'admin') ? 'all' : 'my';
        FlowRouter.go('ordersList', {scope: scope});
        tmpl.closeSideNav();
    },

    'click #checkoutCredentials': function () {
        FlowRouter.go('checkoutCredentialsList');
        tmpl.closeSideNav();
    },

    'submit .search-form': function (event, tmpl) {
        event.preventDefault();
        var searchString = $(event.target).find('input').val();
        FlowRouter.go('publicationsList', {}, {search: searchString});
    }
});