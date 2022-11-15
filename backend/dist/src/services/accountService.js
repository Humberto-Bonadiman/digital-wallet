"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var AccountsService = /** @class */ (function () {
    function AccountsService() {
    }
    AccountsService.prototype.create = function () {
        var prisma = new client_1.PrismaClient();
        var balance = AccountsService.initialBalance;
        var createAccount = prisma.accounts.create({
            data: { balance: balance }
        });
        return createAccount;
    };
    AccountsService.initialBalance = 100.0;
    return AccountsService;
}());
exports["default"] = AccountsService;
//# sourceMappingURL=accountService.js.map