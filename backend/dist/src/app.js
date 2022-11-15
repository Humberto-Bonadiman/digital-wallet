"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = exports.App = void 0;
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var swagger_json_1 = __importDefault(require("../swagger.json"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1["default"])();
        this.config();
    }
    App.prototype.config = function () {
        this.app.use((0, cors_1["default"])());
        var accessControl = function (_req, res, next) {
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use(express_1["default"].json());
        this.app.get('/', function (_req, res) {
            res.status(200).json({ message: 'Aplicação funcionando' });
        });
        this.app.use('/users', userRoutes_1["default"]);
        this.app.use('/docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_json_1["default"]));
    };
    App.prototype.start = function (PORT) {
        this.app.listen(PORT, function () { return console.log("Aplica\u00E7\u00E3o rodando na porta ".concat(PORT)); });
    };
    return App;
}());
exports.App = App;
exports.app = new App().app;
//# sourceMappingURL=app.js.map