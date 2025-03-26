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
const shopcart_service_1 = require("../../src/services/shopcart.service");
const models_1 = require("../../src/models");
const mongoose_1 = require("mongoose");
describe('ShopCart Service', () => {
    let testUserId;
    let testCandleId1;
    let testCandleId2;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Crear usuario de prueba
        const user = yield models_1.UserModel.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });
        testUserId = user._id;
        // Crear velas de prueba
        const candle1 = yield models_1.CandleModel.create({
            id_container: new mongoose_1.Types.ObjectId(),
            id_fragance: new mongoose_1.Types.ObjectId()
        });
        testCandleId1 = candle1._id;
        const candle2 = yield models_1.CandleModel.create({
            id_container: new mongoose_1.Types.ObjectId(),
            id_fragance: new mongoose_1.Types.ObjectId()
        });
        testCandleId2 = candle2._id;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.ShopCartModel.deleteMany({});
        yield models_1.UserModel.deleteMany({});
        yield models_1.CandleModel.deleteMany({});
    }));
    describe('getOrCreateCart', () => {
        it('should create new cart if not exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const cart = yield shopcart_service_1.shopcartService.getOrCreateCart(testUserId);
            expect(cart).toBeDefined();
        }));
        it('should return existing cart', () => __awaiter(void 0, void 0, void 0, function* () {
            // Crear carrito primero
            yield shopcart_service_1.shopcartService.getOrCreateCart(testUserId);
            const cart = yield shopcart_service_1.shopcartService.getOrCreateCart(testUserId);
            expect(cart).toBeDefined();
            // Verificar que no se creó duplicado
            const carts = yield models_1.ShopCartModel.find({ id_user: testUserId });
            expect(carts).toHaveLength(1);
        }));
    });
    describe('addItemToCart', () => {
        it('should add new item to cart', () => __awaiter(void 0, void 0, void 0, function* () {
            const cart = yield shopcart_service_1.shopcartService.addItemToCart(testUserId, {
                id_candle: testCandleId1,
                quantity: 1
            });
            expect(cart.items).toHaveLength(1);
            expect(cart.items[0]._id.toString()).toBe(testCandleId1);
            expect(cart.items[0].quantity).toBe(1);
        }));
    });
});
