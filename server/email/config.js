Meteor.startup(function () {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
});