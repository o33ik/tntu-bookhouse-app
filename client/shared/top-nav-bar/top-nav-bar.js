Template.topNavBar.onRendered(function () {
    this.$(".button-collapse").sideNav();
    this. $('.collapsible').collapsible();
});

Template.topNavBar.helpers({
    activeMenuItem: function () {
        return;
    }
});

Template.topNavBar.events({});