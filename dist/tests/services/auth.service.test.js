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
const auth_service_1 = require("../../src/services/auth.service");
const user_service_1 = require("../../src/services/user.service");
const models_1 = require("../../src/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Auth Service', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const role = new models_1.RoleModel({ name: 'client' });
        yield role.save();
        const userInput = {
            name: 'Initial User',
            email: 'initial@example.com',
            password: 'password123',
        };
        yield auth_service_1.authService.registerUser(userInput);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.UserModel.deleteMany({});
        yield models_1.RoleModel.deleteMany({});
    }));
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };
        const user = yield auth_service_1.authService.registerUser(userInput);
        expect(user).toBeDefined();
        expect(user.email).toBe(userInput.email);
        expect(user.roles).toBeDefined();
        expect(user.roles.length).toBeGreaterThan(0);
    }));
    it('should throw an error when registering a user with an existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            name: 'Duplicate User',
            email: 'initial@example.com', // Same email as the initial user
            password: 'password123',
        };
        yield expect(auth_service_1.authService.registerUser(userInput)).rejects.toThrow(ReferenceError);
    }));
    it('should login a user with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: 'initial@example.com',
            password: 'password123',
        };
        const response = yield auth_service_1.authService.login(userLogin);
        expect(response).toBeDefined();
        expect(response === null || response === void 0 ? void 0 : response.user.email).toBe(userLogin.email);
        expect(response === null || response === void 0 ? void 0 : response.user.token).toBeDefined();
    }));
    it('should throw an error when logging in with incorrect email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };
        yield expect(auth_service_1.authService.login(userLogin)).rejects.toThrow('Not Authorized');
    }));
    it('should throw an error when logging in with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: 'initial@example.com',
            password: 'wrongpassword',
        };
        yield expect(auth_service_1.authService.login(userLogin)).rejects.toThrow('Not Authorized');
    }));
    it('should generate a valid JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.userService.findByEmail('initial@example.com');
        const token = auth_service_1.authService.generateToken(user);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        expect(decoded).toBeDefined();
        expect(decoded.user.email).toBe(user === null || user === void 0 ? void 0 : user.email);
    }));
});
