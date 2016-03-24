var pdfStore = new FS.Store.GridFS("publications-pdf", {});

PublicationsPdf = new FS.Collection("publications-pdf", {
    stores: [pdfStore]
});