import Images from '/server/cfs-collections/images.js';

Images.allow({
    download: function() {
        return true;
    }
});