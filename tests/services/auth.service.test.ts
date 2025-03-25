import { authService } from '../../src/services/auth.service';
import { userService } from '../../src/services/user.service';
import { UserInput, UserLogin } from '../../src/interfaces';
import { UserModel, RoleModel } from '../../src/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Auth Service', () => {
    beforeEach(async () => {
        const role = new RoleModel({ name: 'client' });
        await role.save();

        const userInput: UserInput = {
            name: 'Initial User',
            email: 'initial@example.com',
            password: 'password123',
        };
        await authService.registerUser(userInput);
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
        await RoleModel.deleteMany({});
    });
  
    it('should register a new user', async () => {
        const userInput: UserInput = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };

        const user = await authService.registerUser(userInput);
        expect(user).toBeDefined();
        expect(user.email).toBe(userInput.email);
        expect(user.roles).toBeDefined();
        expect(user.roles.length).toBeGreaterThan(0);
    });

    it('should throw an error when registering a user with an existing email', async () => {
        const userInput: UserInput = {
            name: 'Duplicate User',
            email: 'initial@example.com', // Same email as the initial user
            password: 'password123',
        };

        await expect(authService.registerUser(userInput)).rejects.toThrow(ReferenceError);
    });

    it('should login a user with correct credentials', async () => {
        const userLogin: UserLogin = {
            email: 'initial@example.com',
            password: 'password123',
        };

        const response = await authService.login(userLogin);
        expect(response).toBeDefined();
        expect(response?.user.email).toBe(userLogin.email);
        expect(response?.user.token).toBeDefined();
    });

    it('should throw an error when logging in with incorrect email', async () => {
        const userLogin: UserLogin = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };

        await expect(authService.login(userLogin)).rejects.toThrow('Not Authorized');
    });

    it('should throw an error when logging in with incorrect password', async () => {
        const userLogin: UserLogin = {
            email: 'initial@example.com',
            password: 'wrongpassword',
        };

        await expect(authService.login(userLogin)).rejects.toThrow('Not Authorized');
    });

    it('should generate a valid JWT token', async () => {
        const user = await userService.findByEmail('initial@example.com');
        const token = authService.generateToken(user!);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        expect(decoded).toBeDefined();
        expect((decoded as any).user.email).toBe(user?.email);
    });
});