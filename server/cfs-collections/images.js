var imagesDropboxStore = new FS.Store.Dropbox("images", {
    key: Meteor.settings.private.DROPBOX.key,
    secret: Meteor.settings.private.DROPBOX.secret,
    token: Meteor.settings.private.DROPBOX.token
});

Images = new FS.Collection("images", {
    stores: [imagesDropboxStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});