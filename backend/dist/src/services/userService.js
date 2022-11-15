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
        while (_) try {
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
require("dotenv/config");
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = __importDefault(require("bcrypt"));
var accountService_1 = __importDefault(require("./accountService"));
var UsersService = /** @class */ (function () {
    function UsersService() {
    }
    UsersService.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, prisma, account, accountId, passwordHash, userCreated;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = user.username, password = user.password;
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, new accountService_1["default"]().create()];
                    case 1:
                        account = _b.sent();
                        accountId = account.id;
                        passwordHash = bcrypt_1["default"].hashSync(password, 10);
                        userCreated = prisma.users.create({
                            data: {
                                username: username,
                                password: passwordHash,
                                accountId: accountId
                            }
                        });
                        _a = {};
                        return [4 /*yield*/, userCreated];
                    case 2:
                        _a.id = (_b.sent()).id;
                        return [4 /*yield*/, userCreated];
                    case 3:
                        _a.username = (_b.sent()).username;
                        return [4 /*yield*/, userCreated];
                    case 4: return [2 /*return*/, (_a.accountId = (_b.sent()).accountId,
                            _a)];
                }
            });
        });
    };
    UsersService.prototype.login = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, expiresIn, algorithm, findUniqueUser, SECRET, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        expiresIn = '7d';
                        algorithm = 'HS256';
                        return [4 /*yield*/, prisma.users.findUnique({
                                where: {
                                    username: username
                                },
                                select: {
                                    id: true,
                                    username: true,
                                    accountId: true
                                }
                            })];
                    case 1:
                        findUniqueUser = _a.sent();
                        SECRET = process.env.JWT_SECRET || "SECRET";
                        token = (0, jsonwebtoken_1.sign)({ data: findUniqueUser }, SECRET, { expiresIn: expiresIn, algorithm: algorithm });
                        return [2 /*return*/, token];
                }
            });
        });
    };
    return UsersService;
}());
exports["default"] = UsersService;
//# sourceMappingURL=userService.js.map