"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const connectionDB_1 = require("./lib/connectionDB");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return connectionDB_1.db; } });
const initialSetup_1 = require("./lib/initialSetup");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
(0, initialSetup_1.createRoles)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', routes_1.userRouter);
app.use('/auth', routes_1.authRouter);
app.use('/container', routes_1.containerRouter);
app.use('/fragance', routes_1.fraganceRouter);
app.use('/candle', routes_1.candleRouter);
connectionDB_1.db.then(() => app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}));
