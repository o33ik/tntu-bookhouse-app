Template.orderView.onCreated(function () {
});

Template.orderView.helpers({
    orderItem: function (orderId) {
        return Publications.findOne(orderId);
    }
});

Template.orderView.events({
    'click .attach-check-button': function (event, tmpl) {
        var data = {
            order: tmpl.data.order
        };
        var parentNode = $('body')[0];
        Blaze.renderWithData(Template.attachCheckModal, data, parentNode);
    },

    'click .confirm-paid-button': function (event, tmpl) {
        Meteor.call('confirmOrder', tmpl.data.order._id, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    },

    'click li a': function (event) {
        FlowRouter.go('viewPublication', {id: event.currentTarget.id});
    },

    'click .delete-image': function (event, tmpl) {
        Meteor.call('deleteCheckFromOrder', tmpl.data.order._id);
    }
});