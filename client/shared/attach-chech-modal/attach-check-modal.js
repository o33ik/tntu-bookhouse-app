import notify from '/client/notify.js';

Template.attachCheckModal.onCreated(function () {
    this.removeTemplate = function (view) {
        setTimeout(function () {
            Blaze.remove(view);
        }, 500);
    };
});

Template.attachCheckModal.onRendered(function () {

    this.$('#attach-check-modal').openModal();
    var self = this;
    $('.lean-overlay').on('click', function () {
        self.removeTemplate(self.view);
    });

});

Template.attachCheckModal.events({
    'change #check-input': function (event, tmpl) {
        var reader = new FileReader();
        reader.onload = function (event) {
            tmpl.imageBase64 = event.target.result;
        };

        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    },

    'click .confirm': function (event, tmpl) {
        event.preventDefault();

        Meteor.call('attachCheckToOrder', tmpl.data.order._id, tmpl.imageBase64,
            function (err, res) {
                if (err) {
                    notify(err.message);
                }
            });

        tmpl.removeTemplate(tmpl.view);
    },
    'click .cancel': function (event, tmpl) {
        event.preventDefault();
        tmpl.removeTemplate(tmpl.view);
    }
});

Template.attachCheckModal.onDestroyed(function () {
    $('.lean-overlay').remove();
});