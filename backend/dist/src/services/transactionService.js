"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = require("jsonwebtoken");
var TransactionService = /** @class */ (function () {
    function TransactionService() {
    }
    TransactionService.prototype.create = function (debitedUsername, creditedUsername, value) {
        return __awaiter(this, void 0, void 0, function () {
            var findDebitedUser, findCreditedUser, findDebitedAccount, findCreditedAccount, createTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                            where: { username: debitedUsername },
                            select: {
                                id: true,
                                username: true,
                                accountId: true
                            }
                        })];
                    case 1:
                        findDebitedUser = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                                where: { username: creditedUsername },
                                select: {
                                    id: true,
                                    username: true,
                                    accountId: true
                                }
                            })];
                    case 2:
                        findCreditedUser = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.findUniqueOrThrow({
                                where: { id: findDebitedUser.accountId }
                            })];
                    case 3:
                        findDebitedAccount = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.update({
                                where: { id: findDebitedUser.accountId },
                                data: { balance: (Number(findDebitedAccount.balance) - value) }
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.findUniqueOrThrow({
                                where: { id: findCreditedUser.accountId }
                            })];
                    case 5:
                        findCreditedAccount = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.update({
                                where: { id: findCreditedUser.accountId },
                                data: { balance: (Number(findCreditedAccount.balance) + value) }
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().transactions.create({
                                data: {
                                    debitedAccountId: findDebitedUser.accountId,
                                    creditedAccountId: findCreditedUser.accountId,
                                    value: value
                                }
                            })];
                    case 7:
                        createTransaction = _a.sent();
                        return [2 /*return*/, createTransaction];
                }
            });
        });
    };
    TransactionService.prototype.findAllUserTransactions = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var SECRET, decoded, findUser, findAccount, findTransactionsByAccountId, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        SECRET = process.env.JWT_SECRET || (function () {
                            throw new Error('SECRET not found');
                        })();
                        decoded = (0, jsonwebtoken_1.verify)(token, SECRET);
                        return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                                where: { id: decoded.data.id },
                                select: {
                                    id: true,
                                    username: true,
                                    accountId: true
                                }
                            })];
                    case 1:
                        findUser = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.findUniqueOrThrow({
                                where: { id: findUser.accountId }
                            })];
                    case 2:
                        findAccount = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().transactions.findMany({
                                where: {
                                    OR: [
                                        { debitedAccountId: findAccount.id },
                                        { creditedAccountId: findAccount.id }
                                    ]
                                }
                            })];
                    case 3:
                        findTransactionsByAccountId = _a.sent();
                        return [2 /*return*/, findTransactionsByAccountId];
                    case 4:
                        err_1 = _a.sent();
                        throw Error;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.filterUserTransactions = function (token, debited, credited, date) {
        return __awaiter(this, void 0, void 0, function () {
            var SECRET, decoded, findUser, findAccount, findTransactionsByAccountId, findTransactionsByAccountId, findTransactionsByAccountId, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        SECRET = process.env.JWT_SECRET || (function () {
                            throw new Error('SECRET not found');
                        })();
                        decoded = (0, jsonwebtoken_1.verify)(token, SECRET);
                        if (!(debited || credited)) return [3 /*break*/, 8];
                        return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                                where: { id: decoded.data.id },
                                select: {
                                    id: true,
                                    username: true,
                                    accountId: true
                                }
                            })];
                    case 1:
                        findUser = _a.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.findUniqueOrThrow({
                                where: { id: findUser.accountId }
                            })];
                    case 2:
                        findAccount = _a.sent();
                        if (!(debited && credited)) return [3 /*break*/, 4];
                        return [4 /*yield*/, new client_1.PrismaClient().transactions.findMany({
                                where: {
                                    OR: [
                                        { debitedAccountId: findAccount.id },
                                        { AND: { createdAt: date } },
                                        { AND: { creditedAccountId: findAccount.id } }
                                    ]
                                }
                            })];
                    case 3:
                        findTransactionsByAccountId = _a.sent();
                        return [2 /*return*/, findTransactionsByAccountId];
                    case 4:
                        if (!(debited && credited === false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, new client_1.PrismaClient().transactions.findMany({
                                where: {
                                    OR: [
                                        { debitedAccountId: findAccount.id },
                                        { AND: { createdAt: date } }
                                    ]
                                }
                            })];
                    case 5:
                        findTransactionsByAccountId = _a.sent();
                        return [2 /*return*/, findTransactionsByAccountId];
                    case 6:
                        if (!(debited === false && credited)) return [3 /*break*/, 8];
                        return [4 /*yield*/, new client_1.PrismaClient().transactions.findMany({
                                where: {
                                    OR: [
                                        { createdAt: date },
                                        { AND: { creditedAccountId: findAccount.id } }
                                    ]
                                }
                            })];
                    case 7:
                        findTransactionsByAccountId = _a.sent();
                        return [2 /*return*/, findTransactionsByAccountId];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_2 = _a.sent();
                        throw Error;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return TransactionService;
}());
exports["default"] = TransactionService;
//# sourceMappingURL=transactionService.js.map