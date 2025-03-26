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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    createUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userInput.email);
                if (userExists != null) {
                    throw new ReferenceError("User already exists");
                }
                if (userInput.password)
                    userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                const role = yield models_1.RoleModel.findOne({ name: "client" });
                const user = yield models_1.UserModel.create(Object.assign(Object.assign({}, userInput), { roles: [role === null || role === void 0 ? void 0 : role._id] }));
                yield user.populate('roles');
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findOne({ email }).populate('roles');
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findById(id).populate('roles');
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.UserModel.find().populate('roles');
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findOneAndUpdate({ _id: id }, userInput, { returnOriginal: false }).populate('roles');
                if (!user) {
                    throw new Error('User not found');
                }
                user.password = "";
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findByIdAndDelete(id);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.userService = new UserService();
