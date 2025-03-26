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
exports.authService = void 0;
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const exceptions_1 = require("../exceptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
class AuthService {
    registerUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield user_service_1.userService.findByEmail(userInput.email);
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
    login(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield models_1.UserModel.findOne({ email: userLogin.email }).populate('roles');
                if (userExists === null) {
                    throw new exceptions_1.AuthError("Not Authorized");
                }
                const isMatch = yield bcrypt_1.default.compare(userLogin.password, userExists.password);
                if (!isMatch) {
                    throw new exceptions_1.AuthError("Not Authorized");
                }
                return {
                    user: {
                        id: userExists.id,
                        name: userExists.name,
                        email: userExists.email,
                        roles: userExists.roles.map(role => role.name),
                        token: this.generateToken(userExists)
                    }
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(user) {
        try {
            return jsonwebtoken_1.default.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roles: user.roles.map(role => role.name)
                }
            }, process.env.JWT_SECRET || "secret", { expiresIn: "10m" });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.authService = new AuthService();
