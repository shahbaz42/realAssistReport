"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("./utils");
const dataRouter_1 = __importDefault(require("./router/dataRouter"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 60, // 60 requests
}));
app.use((0, morgan_1.default)('dev')); // logging
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // cors
app.set('views', path_1.default.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/health', (req, res) => {
    res.status(200).send('ok');
});
app.use('/data', dataRouter_1.default); // data router
app.use(utils_1.ErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map