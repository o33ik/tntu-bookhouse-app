import PublicationsPdf from '/server/cfs-collections/publications-pdf.js';

PublicationsPdf.allow({
    download: function() {
        return true;
    }
});