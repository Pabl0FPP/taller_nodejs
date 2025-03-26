import { shopcartService } from '../../src/services/shopcart.service';
import { UserModel, CandleModel, ShopCartModel } from '../../src/models';
import { Types } from 'mongoose';

describe('ShopCart Service', () => {
    let testUserId: string;
    let testCandleId1: string;
    let testCandleId2: string;

    beforeEach(async () => {

        // Crear usuario de prueba
        const user = await UserModel.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });
        testUserId = user._id as string;

        // Crear velas de prueba
        const candle1 = await CandleModel.create({
            id_container: new Types.ObjectId(),
            id_fragance: new Types.ObjectId()
        });
        testCandleId1 = candle1._id as string;

        const candle2 = await CandleModel.create({
            id_container: new Types.ObjectId(),
            id_fragance: new Types.ObjectId()
        });
        testCandleId2 = candle2._id as string;
    });

    afterEach(async () => {
        await ShopCartModel.deleteMany({});
        await UserModel.deleteMany({});
        await CandleModel.deleteMany({});
    });

    describe('getOrCreateCart', () => {
        it('should create new cart if not exists', async () => {
            const cart = await shopcartService.getOrCreateCart(testUserId);
            expect(cart).toBeDefined();
        });

        it('should return existing cart', async () => {
            // Crear carrito primero
            await shopcartService.getOrCreateCart(testUserId);
            
            const cart = await shopcartService.getOrCreateCart(testUserId);
            expect(cart).toBeDefined();
            
            // Verificar que no se creó duplicado
            const carts = await ShopCartModel.find({ id_user: testUserId });
            expect(carts).toHaveLength(1);
        });
    });

    describe('addItemToCart', () => {
        it('should add new item to cart', async () => {
            const cart = await shopcartService.addItemToCart(testUserId, {
                id_candle: testCandleId1,
                quantity: 1
            });

            expect(cart.items).toHaveLength(1);
            expect(cart.items[0]._id.toString()).toBe(testCandleId1);
            expect(cart.items[0].quantity).toBe(1);
        });
    });
});