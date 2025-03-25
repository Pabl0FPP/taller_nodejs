import { userService } from '../../src/services';
import { UserInput, UserInputUpdate } from '../../src/interfaces';
import { UserModel } from '../../src/models';

describe('User Service', () => {
    beforeEach(async () => {
        const userInput: UserInput = {
            name: 'Initial User',
            email: 'initial@example.com',
            password: 'password123',
        };
        await userService.createUser(userInput);
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it('should create a new user', async () => {
        const userInput: UserInput = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };

        const user = await userService.createUser(userInput);
        expect(user).toBeDefined();
        expect(user.email).toBe(userInput.email);
        expect(user.roles).toBeDefined();
    });

    it('should get a user by email', async () => {
        const email = 'initial@example.com';
        const user = await userService.findByEmail(email);
        expect(user).toBeDefined();
        expect(user?.email).toBe(email);
    });

    it('should get a user by id', async () => {
        const user = await userService.findByEmail('initial@example.com');
        const userId = user?._id as string;
        const foundUser = await userService.findById(userId);
        expect(foundUser).toBeDefined();
        expect(foundUser?.email).toBe('initial@example.com');
    });

    it('should get all users', async () => {
        const users = await userService.getUsers();
        expect(users).toBeDefined();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should update a user', async () => {
        const userInputUpdate: UserInputUpdate = {
            name: 'Updated User',
            email: 'initial@example.com'
        };
        const user = await userService.findByEmail('initial@example.com');
        const userId = user?._id as string;
        const updatedUser = await userService.updateUser(userId, userInputUpdate);
        expect(updatedUser).toBeDefined();
        expect(updatedUser?.name).toBe(userInputUpdate.name);
    });

    it('should delete a user', async () => {
        const user = await userService.findByEmail('initial@example.com');
        const userId = user?._id as string;
        await userService.deleteUser(userId);
        const deletedUser = await userService.findByEmail('initial@example.com');
        expect(deletedUser).toBeNull();
    });

    // Tests for non-happy paths
    it('should throw an error when creating a user with an existing email', async () => {
        const userInput: UserInput = {
            name: 'Duplicate User',
            email: 'initial@example.com', // Same email as the initial user
            password: 'password123',
        };

        await expect(userService.createUser(userInput)).rejects.toThrow(ReferenceError);
    });

    it('should return null when getting a user by non-existing email', async () => {
        const email = 'nonexistent@example.com';
        const user = await userService.findByEmail(email);
        expect(user).toBeNull();
    });

    it('should return null when getting a user by non-existing id', async () => {
        const userId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        const user = await userService.findById(userId);
        expect(user).toBeNull();
    });

    it('should throw an error when updating a user with a non-existing id', async () => {
        const userInputUpdate: UserInputUpdate = {
            name: 'Non-existing User',
            email: 'non-existinguser@gmail.com'
        };
        const userId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id

        await expect(userService.updateUser(userId, userInputUpdate)).rejects.toThrow();
    });

    it('should throw an error when deleting a user with a non-existing id', async () => {
        const userId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id

        await expect(userService.deleteUser(userId)).rejects.toThrow();
    });

        // Tests for error handling in findByEmail, findById, and getUsers
        it('should throw an error when findByEmail encounters a database error', async () => {
            jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
            await expect(userService.findByEmail('initial@example.com')).rejects.toThrow('Database error');
        });
    
        it('should throw an error when findById encounters a database error', async () => {
            jest.spyOn(UserModel, 'findById').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
            await expect(userService.findById('605c72ef1c4a4e3a2c8f9b9b')).rejects.toThrow('Database error');
        });
    
        it('should throw an error when getUsers encounters a database error', async () => {
            jest.spyOn(UserModel, 'find').mockImplementationOnce(() => {
                throw new Error('Database error');
            });
            await expect(userService.getUsers()).rejects.toThrow('Database error');
        });
});