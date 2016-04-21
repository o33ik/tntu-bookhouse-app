Meteor.startup(function () {
    var options = {
        apiKey: Meteor.settings.private.MAIL_GUN.API_KEY,
        domain: Meteor.settings.private.MAIL_GUN.DOMAIN
    };

    var mailGun = new Mailgun(options);

    AppTntu = AppTntu || {};
    AppTntu.mailGun = mailGun;
});