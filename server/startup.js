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


createDefaultCheckoutCredentials();