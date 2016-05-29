var pdfDropboxStore = new FS.Store.Dropbox("publications-pdf", {
    key: Meteor.settings.private.DROPBOX.key,
    secret: Meteor.settings.private.DROPBOX.secret,
    token: Meteor.settings.private.DROPBOX.token
});

export default new FS.Collection("publications-pdf", {
    stores: [pdfDropboxStore],
    filter: {
        allow: {
            contentTypes: ['application/pdf']
        }
    }
});