Meteor.startup(function () {
    AppTntu.notify = function (message) {
        Materialize.toast(message, 4000)
    };
});