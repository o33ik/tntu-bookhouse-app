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

        var file = event.target.files[0];
        if (file && file.size < 2 * 1000 * 1000) {
            reader.readAsDataURL(file);
        } else {
            notify(TAPi18n.__('fileShouldBeLess') + ' 2Mb');
            tmpl.$('#check-input').val('');
        }
    },

    'click .confirm': function (event, tmpl) {
        event.preventDefault();

        Meteor.call('attachCheckToOrder', tmpl.data.order._id, tmpl.imageBase64,
            function (err, res) {
                if (err) {
                    notify(err.message);
                } else {
                    tmpl.removeTemplate(tmpl.view);
                }
            });
    },
    'click .cancel': function (event, tmpl) {
        event.preventDefault();
        tmpl.removeTemplate(tmpl.view);
    }
});

Template.attachCheckModal.onDestroyed(function () {
    $('.lean-overlay').remove();
});