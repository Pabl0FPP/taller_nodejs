import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, RoleModel } from './src/models';

let mongoServer: MongoMemoryServer;
let adminToken: string;

beforeAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // Create admin role
    const adminRole = await RoleModel.create({ name: 'admin' });

    // Create admin user
    const adminPassword = await bcrypt.hash('adminpassword', 10);
    const adminUser = await UserModel.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        roles: [adminRole._id]
    });

    // Generate JWT token for admin user
    adminToken = jwt.sign({
        user: {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
            roles: ['admin']
        }
    }, process.env.JWT_SECRET || 'secret', { expiresIn: '10m' });
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

export { adminToken };