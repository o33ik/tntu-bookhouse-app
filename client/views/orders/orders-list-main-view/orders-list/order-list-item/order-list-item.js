import Publications from '/both/collections/publications.js';

Template.orderListItem.helpers({
    orderItem: function (orderId) {
        return Publications.findOne(orderId);
    }
});

Template.orderListItem.events({
    'click .card-title': function (event, tmpl) {
        FlowRouter.go('orderView', {id: tmpl.data.order._id});
    },

    'click .order-item': function (event) {
        FlowRouter.go('viewPublication', {id: event.currentTarget.id});
    }
});