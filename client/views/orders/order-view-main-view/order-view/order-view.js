import Publications from '/both/collections/publications.js';
import notify from '/client/notify.js';

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
        swal({
            title: TAPi18n.__('writeTtn'),
            type: 'input',
            showCancelButton: true,
            animation: 'slide-from-top',
            closeOnConfirm: false
        }, function (inputValue) {
            if (/\d{14}/.test(inputValue)) {
                Meteor.call('confirmOrder', tmpl.data.order._id, inputValue, function (err, res) {
                    if (err) {
                        notify(err.message);
                    } else {
                        swal.close();
                    }
                });
            } else {
                swal(TAPi18n.__('error'), TAPi18n.__('invallidTtn'), 'error');
            }
        });
    },

    'click .title': function (event) {
        FlowRouter.go('viewPublication', {id: event.currentTarget.id});
    },

    'click .delete-image': function (event, tmpl) {
        swal({
            title: TAPi18n.__('deleteImage'),
            text: TAPi18n.__('deleteMessageQuestion'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: TAPi18n.__('yesDelete'),
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