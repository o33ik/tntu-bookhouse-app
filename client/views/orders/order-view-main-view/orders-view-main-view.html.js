Template.orderViewMainView.onCreated(function () {
    var self = this;
    this.autorun(function () {
        self.subscribe('orders', FlowRouter.getParam('id'));
    });
});

Template.orderViewMainView.helpers({
    order: function () {
        return Orders.findOne(FlowRouter.getParam('id'));
    }
});