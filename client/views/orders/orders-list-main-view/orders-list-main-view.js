Template.ordersListMainView.onCreated(function(){
    var self = this;
    this.autorun(function(){
        self.subscribe('orders');
    })
});

Template.ordersListMainView.helpers({
   orders: function(){
       return Orders.find({}, {sort: {placedAt: 1}});
   }
});