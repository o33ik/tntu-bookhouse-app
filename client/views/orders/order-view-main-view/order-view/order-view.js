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
                AppTntu.notify(err.message);
            } else {
                console.log(res);
            }
        });
    },

    'click .title': function (event) {
        FlowRouter.go('viewPublication', {id: event.currentTarget.id});
    },

    'click .delete-image': function (event, tmpl) {
        swal({
            title: "qwe",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function () {
            Meteor.call('deleteCheckFromOrder', tmpl.data.order._id);
        });
    },

    'click .payment-info': function (event, tmpl) {
        var paymentInfo = tmpl.data.order.paymentInfo;
        var newWindow = window.open();
        newWindow.document.write(paymentInfo);
    }
});