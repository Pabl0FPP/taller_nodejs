"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopcartRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
exports.shopcartRouter = (0, express_1.Router)();
exports.shopcartRouter.get("/", middleware_1.authenticateJWT, controllers_1.shopcartController.getCart);
exports.shopcartRouter.post("/", middleware_1.authenticateJWT, controllers_1.shopcartController.addToCart);
