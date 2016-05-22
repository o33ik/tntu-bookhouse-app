Template.orderViewMainView.onCreated(function () {
    var self = this;
    this.autorun(function () {
        self.subscribe('orderItem', FlowRouter.getParam('id'));
    });
});

Template.orderViewMainView.helpers({
    order: function () {
        var query = {
            _id: FlowRouter.getParam('id')
        };
        return Orders.findOne(query);
    }
});