"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", controllers_1.authController.register);
exports.authRouter.post("/login", controllers_1.authController.login);
