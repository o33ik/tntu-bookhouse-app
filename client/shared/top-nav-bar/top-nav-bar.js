Template.topNavBar.onRendered(function () {
    this.$(".button-collapse").sideNav();
    this.$('.collapsible').collapsible();
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
        //Cookie.remove('lg');
        //Cookie.set('lg', selectedLanguage, {
        //    expires: 30
        //});
    }
});