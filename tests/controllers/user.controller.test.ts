import { app, request } from '../../src/app';
import { UserModel, RoleModel } from '../../src/models';
import { UserInput } from '../../src/interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { adminToken } from '../../jest.setup';


describe('User Controller', () => {
    it('should get all users', async () => {
        const response = await request(app)
            .get('/user')
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new user', async () => {
        const newUser = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newUser)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should not create a user with an existing email', async () => {
        const existingUser = {
            name: 'Existing User',
            email: 'existinguser@example.com',
            password: 'password123'
        };

        await UserModel.create(existingUser);

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(existingUser)
            .expect(400);

        expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should get a user by ID', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            roles: []
        });

        const response = await request(app)
            .get(`/user/${user._id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

        expect(response.body).toHaveProperty('_id', user._id?.toString());
        expect(response.body).toHaveProperty('name', user.name);
        expect(response.body).toHaveProperty('email', user.email);
    });

    it('should return 404 if user not found by ID', async () => {
        const nonExistentUserId = '605c72ef2f1b2c001f8f1b2c';

        const response = await request(app)
            .get(`/user/${nonExistentUserId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(404);

        expect(response.body).toHaveProperty('message', `User with id ${nonExistentUserId} not found`);
    });

    it('should update a user', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            roles: []
        });

        const updatedUser = {
            name: 'Updated User',
            email: 'updateduser@example.com'
        };

        const response = await request(app)
            .put(`/user/${user._id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedUser)
            .expect(200);

        expect(response.body).toHaveProperty('_id', user._id?.toString());
        expect(response.body).toHaveProperty('name', updatedUser.name);
        expect(response.body).toHaveProperty('email', updatedUser.email);
    });

    it('should delete a user', async () => {
        const user = await UserModel.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            roles: []
        });

        const response = await request(app)
            .delete(`/user/${user._id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

        expect(response.body).toHaveProperty('_id', user._id?.toString());

        const deletedUser = await UserModel.findById(user._id);
        expect(deletedUser).toBeNull();
    });
});