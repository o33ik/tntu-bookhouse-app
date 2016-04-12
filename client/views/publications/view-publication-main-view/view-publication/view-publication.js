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
    'click .delete-publication-button': function (event, tmpl) {
        var deletePublication = function () {
            Meteor.call('deletePublication', tmpl.data.publication._id, function (err) {
                if (err) {
                    swal("Oops...", "Something went wrong!", err.message);
                } else {
                    swal("Deleted!",
                        "Your imaginary file has been deleted.",
                        "success");
                    FlowRouter.go('publicationsList');
                }
            });
        };
        swal({
            title: "qwe",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, deletePublication);
    }
});