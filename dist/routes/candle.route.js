"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candleRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
exports.candleRouter = (0, express_1.Router)();
exports.candleRouter.post("/", [middleware_1.authenticateJWT], controllers_1.candleController.createCandle);
exports.candleRouter.get("/:id", [middleware_1.authenticateJWT], controllers_1.candleController.getCandle);
