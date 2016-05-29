import notify from '/client/notify.js';

Template.checkoutCredentialsCreateEdit.events({
    'submit form': function (event, tmpl) {
        var getValuesFromForm = function () {
            var account = tmpl.$('#account').val();
            var mfo = tmpl.$('#mfo').val();
            var code = tmpl.$('#code').val();
            var bankName = tmpl.$('#bank-name').val();
            var receiver = tmpl.$('#receiver').val();
            var isActive = tmpl.$('#isActive').prop('checked');

            return {
                account: account,
                mfo: mfo,
                code: code,
                bankName: bankName,
                receiver: receiver,
                isActive: isActive
            }
        };

        event.preventDefault();

        var doc = getValuesFromForm();
        if (tmpl.data.checkoutCredentials) {
            doc._id = tmpl.data.checkoutCredentials._id;
            Meteor.call('editCheckoutCredentials', doc, function (err, res) {
                if (err) {
                    notify(err.message);
                } else {
                    FlowRouter.go('checkoutCredentialsList');
                }
            });
        } else {
            Meteor.call('addNewCheckoutCredentials', doc, function (err, res) {
                if (err) {
                    notify(err.message);
                } else {
                    FlowRouter.go('checkoutCredentialsList');
                }
            });
        }
    },

    'click .cancel-button': function () {
        FlowRouter.go('checkoutCredentialsList');
    }
});