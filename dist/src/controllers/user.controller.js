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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield services_1.userService.createUser(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "User already exists" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services_1.userService.getUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield services_1.userService.findById(id);
                if (user === null) {
                    res.status(404).json({ message: `User with id ${id} not found` });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield services_1.userService.updateUser(id, req.body);
                if (user === null) {
                    res.status(404).json({ message: `User with id ${id} not found` });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield services_1.userService.deleteUser(id);
                if (user === null) {
                    res.status(404).json({ message: `User with id ${id} not found` });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.userController = new UserController();
