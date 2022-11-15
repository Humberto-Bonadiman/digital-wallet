"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var AccountsService = /** @class */ (function () {
    function AccountsService() {
    }
    AccountsService.prototype.create = function () {
        var prisma = new client_1.PrismaClient();
        var initialBalance = 100.00;
        var createAccount = prisma.accounts.create({
            data: { balance: initialBalance }
        });
        return createAccount;
    };
    return AccountsService;
}());
exports["default"] = AccountsService;
//# sourceMappingURL=accountService.js.map