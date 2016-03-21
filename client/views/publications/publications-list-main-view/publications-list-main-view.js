Template.publicationsListMainView.onCreated(function () {
    var self = this;

    this.autorun(function () {
        self.subscribe('publications');
    });
});

Template.publicationsListMainView.helpers({
    publications: function () {
        return Publications.find();
    }
});