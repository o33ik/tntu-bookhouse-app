ServiceConfiguration.configurations.remove({
    service: "google"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: Meteor.settings.private.GOOGLE.CLIENT_ID,
    secret: Meteor.settings.private.GOOGLE.CLIENT_SECRET
});

Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile;

    // if registered via google
    if (user.services && user.services.google && user.services) {

        if (user.services.google.picture) {
            user.profile.avatar = {};
            user.profile.avatar = user.services.google.picture;
        }
    }

    Buckets.insert({userId: user._id, addedBooks: []});

    return user;
});


Meteor.startup(function () {
    if (Meteor.users.find().count() == 0) {
        //Accounts.createUser({});
    }
});