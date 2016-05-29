var pdfDropboxStore = new FS.Store.Dropbox("publications-pdf");

export default new FS.Collection("publications-pdf", {
    stores: [pdfDropboxStore],
    filter: {
        allow: {
            contentTypes: ['application/pdf']
        }
    }
});