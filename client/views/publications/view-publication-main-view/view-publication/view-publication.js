Template.viewPublication.onCreated(function () {
});

Template.viewPublication.onRendered(function () {
    var self = this;
    this.autorun(function () {
        if (AppTntu.canUser('editPublication', Meteor.userId())) {
            Tracker.afterFlush(function () {
                self.$('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        gutter: 0,
                        belowOrigin: true,
                        alignment: 'right'
                    }
                );
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
        Meteor.call('changePublicationStatus', tmpl.data.publication._id, !isHidden,
            function () {
                if (!isHidden) {
                    FlowRouter.go('publicationsList');
                }
            });
    },

    'click .buy-button': function (event, tmpl) {
        AppTntu.bucket.addItemToBucket(tmpl.data.publication._id);
    }
});