Template.publicationsList.helpers({
    publications: function () {
        return Publications.find();
    }
});