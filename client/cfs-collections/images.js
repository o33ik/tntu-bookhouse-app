var imagesDropboxStore = new FS.Store.Dropbox("images");

Images = new FS.Collection("images", {
    stores: [imagesDropboxStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});