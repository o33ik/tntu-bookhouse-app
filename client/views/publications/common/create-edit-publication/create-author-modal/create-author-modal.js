import notify from '/client/notify.js';

Template.createAuthorModal.onCreated(function () {
    var self = this;
    this.removeTemplate = function () {
        self.$('.modal').closeModal();
        setTimeout(function () {
            Blaze.remove(self.view);
        }, 500);
    }
});

Template.createAuthorModal.onRendered(function () {
    this.$('.modal').openModal();

    var self = this;
    $('.lean-overlay').on('click', function () {
        self.removeTemplate();
    });
});

Template.createAuthorModal.events({
    'click .create-author': function (event, tmpl) {
        var authorName = tmpl.$('#authorName').val();
        var authorDocument = {
            name: authorName
        };

        Meteor.call('createAuthor', authorDocument, function (err, res) {
            if (err) {
                notify(err.message);
            } else {
                tmpl.data.addAuthor(res);
                tmpl.removeTemplate();
            }
        });
    },

    'click .cancel': function (event, tmpl) {
        tmpl.removeTemplate();
    }
});