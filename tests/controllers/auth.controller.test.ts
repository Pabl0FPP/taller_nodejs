import { app, request } from '../../src/app';
import { UserModel, RoleModel } from '../../src/models';
import { UserInput, UserLogin } from '../../src/interfaces';

describe('Auth Controller', () => {
    beforeEach(async () => {
        const role = new RoleModel({ name: 'client' });
        await role.save();

        const userInput: UserInput = {
            name: 'Initial User',
            email: 'initial@example.com',
            password: 'password123',
        };
        await request(app).post('/auth/register').send(userInput);
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

        const response = await request(app).post('/auth/register').send(userInput);
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(userInput.email);
        expect(response.body.roles).toBeDefined();
        expect(response.body.roles.length).toBeGreaterThan(0);
    });

    it('should return 400 when registering a user with an existing email', async () => {
        const userInput: UserInput = {
            name: 'Duplicate User',
            email: 'initial@example.com', // Same email as the initial user
            password: 'password123',
        };

        const response = await request(app).post('/auth/register').send(userInput);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    });

    it('should login a user with correct credentials', async () => {
        const userLogin: UserLogin = {
            email: 'initial@example.com',
            password: 'password123',
        };

        const response = await request(app).post('/auth/login').send(userLogin);
        expect(response.status).toBe(200);
        expect(response.body.user.email).toBe(userLogin.email);
        expect(response.body.user.token).toBeDefined();
    });

    it('should return 401 when logging in with incorrect email', async () => {
        const userLogin: UserLogin = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };

        const response = await request(app).post('/auth/login').send(userLogin);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Not Authorized');
    });

    it('should return 401 when logging in with incorrect password', async () => {
        const userLogin: UserLogin = {
            email: 'initial@example.com',
            password: 'wrongpassword',
        };

        const response = await request(app).post('/auth/login').send(userLogin);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Not Authorized');
    });
});