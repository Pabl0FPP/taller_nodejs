"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerRouter = void 0;
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const express_1 = require("express");
exports.containerRouter = (0, express_1.Router)();
exports.containerRouter.post("/", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.containerController.createContainer);
exports.containerRouter.get("/", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.containerController.getAllContainers);
exports.containerRouter.get("/:id", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.containerController.getContainer);
exports.containerRouter.put("/:id", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.containerController.updateContainer);
exports.containerRouter.delete("/:id", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.containerController.deleteContainer);
