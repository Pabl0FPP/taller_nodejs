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
const services_1 = require("../../src/services");
const models_1 = require("../../src/models");
describe('User Service', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            name: 'Initial User',
            email: 'initial@example.com',
            password: 'password123',
        };
        yield services_1.userService.createUser(userInput);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.UserModel.deleteMany({});
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };
        const user = yield services_1.userService.createUser(userInput);
        expect(user).toBeDefined();
        expect(user.email).toBe(userInput.email);
        expect(user.roles).toBeDefined();
    }));
    it('should get a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'initial@example.com';
        const user = yield services_1.userService.findByEmail(email);
        expect(user).toBeDefined();
        expect(user === null || user === void 0 ? void 0 : user.email).toBe(email);
    }));
    it('should get a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield services_1.userService.findByEmail('initial@example.com');
        const userId = user === null || user === void 0 ? void 0 : user._id;
        const foundUser = yield services_1.userService.findById(userId);
        expect(foundUser).toBeDefined();
        expect(foundUser === null || foundUser === void 0 ? void 0 : foundUser.email).toBe('initial@example.com');
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield services_1.userService.getUsers();
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInputUpdate = {
            name: 'Updated User',
            email: 'initial@example.com'
        };
        const user = yield services_1.userService.findByEmail('initial@example.com');
        const userId = user === null || user === void 0 ? void 0 : user._id;
        const updatedUser = yield services_1.userService.updateUser(userId, userInputUpdate);
        expect(updatedUser).toBeDefined();
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name).toBe(userInputUpdate.name);
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield services_1.userService.findByEmail('initial@example.com');
        const userId = user === null || user === void 0 ? void 0 : user._id;
        yield services_1.userService.deleteUser(userId);
        const deletedUser = yield services_1.userService.findByEmail('initial@example.com');
        expect(deletedUser).toBeNull();
    }));
    // Tests for non-happy paths
    it('should throw an error when creating a user with an existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInput = {
            name: 'Duplicate User',
            email: 'initial@example.com', // Same email as the initial user
            password: 'password123',
        };
        yield expect(services_1.userService.createUser(userInput)).rejects.toThrow(ReferenceError);
    }));
    it('should return null when getting a user by non-existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = 'nonexistent@example.com';
        const user = yield services_1.userService.findByEmail(email);
        expect(user).toBeNull();
    }));
    it('should return null when getting a user by non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        const user = yield services_1.userService.findById(userId);
        expect(user).toBeNull();
    }));
    it('should throw an error when updating a user with a non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const userInputUpdate = {
            name: 'Non-existing User',
            email: 'non-existinguser@gmail.com'
        };
        const userId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        yield expect(services_1.userService.updateUser(userId, userInputUpdate)).rejects.toThrow();
    }));
    it('should throw an error when deleting a user with a non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        yield expect(services_1.userService.deleteUser(userId)).rejects.toThrow();
    }));
    // Tests for error handling in findByEmail, findById, and getUsers
    it('should throw an error when findByEmail encounters a database error', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(models_1.UserModel, 'findOne').mockImplementationOnce(() => {
            throw new Error('Database error');
        });
        yield expect(services_1.userService.findByEmail('initial@example.com')).rejects.toThrow('Database error');
    }));
    it('should throw an error when findById encounters a database error', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(models_1.UserModel, 'findById').mockImplementationOnce(() => {
            throw new Error('Database error');
        });
        yield expect(services_1.userService.findById('605c72ef1c4a4e3a2c8f9b9b')).rejects.toThrow('Database error');
    }));
    it('should throw an error when getUsers encounters a database error', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(models_1.UserModel, 'find').mockImplementationOnce(() => {
            throw new Error('Database error');
        });
        yield expect(services_1.userService.getUsers()).rejects.toThrow('Database error');
    }));
});
