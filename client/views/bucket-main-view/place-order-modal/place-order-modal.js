Template.placeOrderModal.onCreated(function () {
    var self = this;
    this.removeTemplate = function (view) {
        setTimeout(function () {
            Blaze.remove(self.view);
        }, 500);
    };
});

Template.placeOrderModal.onRendered(function () {
    this.$('#place-order-modal').openModal();
    var self = this;
    $('.lean-overlay').on('click', function () {
        self.removeTemplate();
    });
});

Template.placeOrderModal.helpers({
    'mobileNumberPattern': '^(\\+?(38))?\\d{7,10}$'
});

Template.placeOrderModal.events({
    'click .confirm': function (event, tmpl) {
        var name = tmpl.$('#name').val();
        var mobileNumber = tmpl.$('#mobile-number').val();
        var email = tmpl.$('#email').val();
        var address = tmpl.$('#address').val();
        tmpl.data.onConfirm({
            name: name,
            mobileNumber: mobileNumber,
            email: email,
            address: address
        });
        tmpl.removeTemplate();
    }
});

Template.placeOrderModal.onDestroyed(function () {
    $('.lean-overlay').remove();
});