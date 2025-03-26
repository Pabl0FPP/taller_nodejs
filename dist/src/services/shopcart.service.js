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
exports.shopcartService = void 0;
const models_1 = require("../models");
class ShopCartService {
    getOrCreateCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cart = yield models_1.ShopCartModel.findOne({ id_user: userId })
                    .populate({
                    path: 'items._id',
                    populate: [
                        { path: 'id_container' },
                        { path: 'id_fragance' }
                    ]
                });
                if (!cart) {
                    cart = yield models_1.ShopCartModel.create({ id_user: userId, items: [] });
                }
                return cart;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addItemToCart(userId, itemInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.getOrCreateCart(userId);
                // Verificar si el item ya existe en el carrito
                const existingItemIndex = cart.items.findIndex(item => item._id.toString() === itemInput.id_candle);
                if (existingItemIndex >= 0) {
                    // Si ya existe, incrementar la cantidad
                    cart.items[existingItemIndex].quantity += itemInput.quantity;
                }
                else {
                    // Si no existe, agregar nuevo item
                    cart.items.push({
                        _id: itemInput.id_candle,
                        quantity: itemInput.quantity
                    });
                }
                yield cart.save();
                return cart.populate({
                    path: 'items._id',
                    populate: [
                        { path: 'id_container' },
                        { path: 'id_fragance' }
                    ]
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeItemFromCart(userId, candleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.getOrCreateCart(userId);
                cart.items = cart.items.filter(item => item._id.toString() !== candleId);
                yield cart.save();
                return cart.populate({
                    path: 'items._id',
                    populate: [
                        { path: 'id_container' },
                        { path: 'id_fragance' }
                    ]
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.shopcartService = new ShopCartService();
