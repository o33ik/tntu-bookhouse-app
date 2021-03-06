import canUser from '/both/user-permissions.js';
import cookieBucket from '/client/bucket-methods.js';

Template.viewPublication.onCreated(function () {
});

Template.viewPublication.onRendered(function () {
    var self = this;
    this.autorun(function () {
        if (canUser('editPublication', Meteor.userId())) {
            Tracker.afterFlush(function () {
                self.$('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    gutter: 0,
                    belowOrigin: true,
                    alignment: 'right'
                });
            });
        }
    });

    this.$('.publication-image').materialbox();
});

Template.viewPublication.helpers({
    contentLines: function () {
        var content = this.publication ? this.publication.content : '';
        return content.split('\n');
    }
});

Template.viewPublication.events({
    'click .edit-publication-button': function (event, tmpl) {
        FlowRouter.go('editPublication', {id: tmpl.data.publication._id});
    },
    'click .change-publication-status-button': function (event, tmpl) {
        var isHidden = tmpl.data.publication.isHidden;
        Meteor.call('changePublicationStatus', tmpl.data.publication._id, !isHidden);
    },

    'click .buy-button': function (event, tmpl) {
        cookieBucket.addItemToBucket(tmpl.data.publication._id);
    }
});