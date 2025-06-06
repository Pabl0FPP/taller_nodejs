"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const schemas_1 = require("../schemas");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.userController.getUsers);
exports.userRouter.post("/", [middleware_1.authenticateJWT, middleware_1.isAdmin], (0, middleware_1.validateSchema)(schemas_1.userSchema), controllers_1.userController.createUser);
exports.userRouter.get("/:id", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.userController.getUser);
exports.userRouter.put("/:id", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.userController.updateUser);
exports.userRouter.delete("/:id", [middleware_1.authenticateJWT, middleware_1.isAdmin], controllers_1.userController.deleteUser);
