"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const connection_DB_1 = require("./lib/connection_DB");
const initial_Setup_1 = require("./lib/initial_Setup");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, initial_Setup_1.createRoles)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', routes_1.userRouter);
app.use('/auth', routes_1.authRouter);
app.use('/container', routes_1.containerRouter);
app.use('/fragance', routes_1.fraganceRouter);
app.use('/candle', routes_1.candleRouter);
app.use('/cart', routes_1.shopcartRouter);
connection_DB_1.db.then(() => app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}));
exports.default = app;
