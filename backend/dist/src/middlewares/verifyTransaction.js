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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
require("dotenv/config");
var StatusCode_1 = __importDefault(require("../enums/StatusCode"));
var jsonwebtoken_1 = require("jsonwebtoken");
var VerifyTransaction = /** @class */ (function () {
    function VerifyTransaction() {
    }
    VerifyTransaction.prototype.tokenNotFound = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                token = req.headers.authorization;
                if (!token) {
                    return [2 /*return*/, res.status(StatusCode_1["default"].UNAUTHORIZED).json({ message: 'Token not found' })];
                }
                next();
                return [2 /*return*/];
            });
        });
    };
    VerifyTransaction.prototype.tokenUsernameValidation = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, debitedUsername, SECRET, decoded;
            return __generator(this, function (_a) {
                try {
                    token = req.headers.authorization;
                    debitedUsername = req.body.debitedUsername;
                    SECRET = process.env.JWT_SECRET || (function () {
                        throw new Error('SECRET not found');
                    })();
                    decoded = (0, jsonwebtoken_1.verify)(token, SECRET);
                    if (decoded.data.username !== debitedUsername) {
                        return [2 /*return*/, res.status(StatusCode_1["default"].UNAUTHORIZED).json({ message: 'Expired or invalid token' })];
                    }
                    next();
                }
                catch (err) {
                    return [2 /*return*/, res.status(StatusCode_1["default"].UNAUTHORIZED).json({ message: 'Expired or invalid token' })];
                }
                return [2 /*return*/];
            });
        });
    };
    VerifyTransaction.prototype.tokenIdValidation = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, SECRET;
            return __generator(this, function (_a) {
                try {
                    token = req.headers.authorization;
                    SECRET = process.env.JWT_SECRET || (function () {
                        throw new Error('SECRET not found');
                    })();
                    (0, jsonwebtoken_1.verify)(token, SECRET);
                    next();
                }
                catch (err) {
                    return [2 /*return*/, res.status(StatusCode_1["default"].UNAUTHORIZED).json({ message: 'Expired or invalid token' })];
                }
                return [2 /*return*/];
            });
        });
    };
    VerifyTransaction.prototype.negativeValue = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = req.body.value;
                if (!value) {
                    return [2 /*return*/, res.status(StatusCode_1["default"].BAD_REQUEST).json({ message: '"value" is required' })];
                }
                if (value < 0) {
                    return [2 /*return*/, res.status(StatusCode_1["default"].BAD_REQUEST).json({ message: '"value" cannot be negative' })];
                }
                next();
                return [2 /*return*/];
            });
        });
    };
    VerifyTransaction.prototype.usersValidation = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, debitedUsername, creditedUsername, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, debitedUsername = _a.debitedUsername, creditedUsername = _a.creditedUsername;
                        if (!debitedUsername || !creditedUsername) {
                            return [2 /*return*/, res.status(StatusCode_1["default"].BAD_REQUEST).json({
                                    message: '"debitedUsername" and "creditedUsername" are required'
                                })];
                        }
                        if (debitedUsername === creditedUsername) {
                            return [2 /*return*/, res.status(StatusCode_1["default"].BAD_REQUEST).json({
                                    message: '"debitedUsername" and "creditedUsername" cannot be equals'
                                })];
                        }
                        return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                                where: { username: debitedUsername }
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                                where: { username: creditedUsername }
                            })];
                    case 2:
                        _b.sent();
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(StatusCode_1["default"].NOT_FOUND).json({ message: 'All users must be registered' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VerifyTransaction.prototype.transferOverBalance = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, debitedUsername, value, debitedUser, debitedAccount, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, debitedUsername = _a.debitedUsername, value = _a.value;
                        return [4 /*yield*/, new client_1.PrismaClient().users.findUniqueOrThrow({
                                where: { username: debitedUsername }
                            })];
                    case 1:
                        debitedUser = _b.sent();
                        return [4 /*yield*/, new client_1.PrismaClient().accounts.findUniqueOrThrow({
                                where: { id: debitedUser.accountId }
                            })];
                    case 2:
                        debitedAccount = _b.sent();
                        if (value > debitedAccount.balance) {
                            return [2 /*return*/, res.status(StatusCode_1["default"].UNAUTHORIZED).json({
                                    message: 'It is not possible to transfer beyond the balance'
                                })];
                        }
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        return [2 /*return*/, res.status(StatusCode_1["default"].NOT_FOUND).json({ message: 'Account not found' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return VerifyTransaction;
}());
exports["default"] = VerifyTransaction;
//# sourceMappingURL=verifyTransaction.js.map