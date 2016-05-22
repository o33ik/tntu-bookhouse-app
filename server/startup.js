var createDefaultCheckoutCredentials = function () {
    if (CheckoutCredentials.find().count() > 0) {
        return;
    }

    var account = '31251209208829';
    var mfo = '820172';
    var code = '05408102';
    var bank = 'ГУДКСУ в Тернопільській області';
    var receiver = 'ТНТУ ім. І.Пулюя';

    CheckoutCredentials.insert({
        account: account,
        mfo: mfo,
        code: code,
        bankName: bank,
        receiver: receiver,
        isActive: true
    });
};

var createDefaultAdmin = function () {
    if (Meteor.users.find().count() > 0) {
        return;
    }

    var admin = {
        email: 'admin@admin.com',
        password: 'admin'
    };

    var userId = Accounts.createUser(admin);
    Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP);
};

createDefaultAdmin();
createDefaultCheckoutCredentials();