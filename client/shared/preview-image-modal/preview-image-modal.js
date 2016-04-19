Template.previewImageModal.onCreated(function () {
    var self = this;
    this.removeTemplate = function () {
        self.$('.modal').closeModal();
        setTimeout(function () {
            Blaze.remove(self.view);
        }, 500);
    }
});

Template.previewImageModal.onRendered(function () {
    this.$('.modal').openModal();

    var self = this;
    $('.lean-overlay').on('click', function () {
        self.removeTemplate();
    });
});