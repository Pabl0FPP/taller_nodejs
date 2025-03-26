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
exports.candleService = void 0;
const candle_model_1 = require("../models/candle.model");
const shopcart_model_1 = require("../models/shopcart.model");
class CandleService {
    createCandle(candleInput, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candle = yield candle_model_1.CandleModel.create(candleInput);
                yield candle.populate("fragance");
                const cart = yield shopcart_model_1.ShopCartModel.findOne({ id_user: userId });
                if (!cart) {
                    yield shopcart_model_1.ShopCartModel.create({
                        id_user: userId,
                        items: [{ _id: candle._id, quantity: 1 }]
                    });
                }
                else {
                    const existingItem = cart.items.find(item => item._id.toString() === candle._id.toString());
                    if (existingItem) {
                        // Si la vela ya está en el carrito, incrementar la cantidad
                        existingItem.quantity += 1;
                    }
                    else {
                        // Si no está en el carrito, añadirla
                        cart.items.push({ _id: candle._id, quantity: 1 });
                    }
                    yield cart.save();
                }
                return candle;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCandles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield shopcart_model_1.ShopCartModel.findOne({ id_user: userId }).populate("items._id");
                if (!cart) {
                    throw new Error("Cart not found for the user");
                }
                // Asegúra que items._id sea del tipo CandleDocument
                return cart.items.map(item => {
                    if (item._id instanceof candle_model_1.CandleModel) {
                        return item._id;
                    }
                    throw new Error("Item is not a valid CandleDocument");
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCandleById(userId, candleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield shopcart_model_1.ShopCartModel.findOne({ id_user: userId }).populate("items._id");
                if (!cart) {
                    throw new Error("Cart not found for the user");
                }
                const item = cart.items.find(item => item._id.toString() === candleId);
                if (!item) {
                    return null;
                }
                // Validar que el item._id sea una instancia de CandleModel
                if (item._id instanceof candle_model_1.CandleModel) {
                    return item._id;
                }
                // Si no es una instancia válida, lanzar un error
                throw new Error("Item is not a valid CandleDocument");
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCandle(userId, candleId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield shopcart_model_1.ShopCartModel.findOne({ id_user: userId }).populate("items._id");
                if (!cart) {
                    throw new Error("Cart not found for the user");
                }
                const item = cart.items.find(item => item._id.toString() === candleId);
                if (!item) {
                    return null;
                }
                if (!(item._id instanceof candle_model_1.CandleModel)) {
                    throw new Error("Item is not a valid CandleDocument");
                }
                // Actualizar las propiedades de la vela
                const candle = item._id;
                Object.assign(candle, updateData);
                yield candle.save();
                return candle;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCandle(userId, candleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield shopcart_model_1.ShopCartModel.findOne({ id_user: userId });
                if (!cart) {
                    throw new Error("Cart not found for the user");
                }
                cart.items = cart.items.filter(item => item._id.toString() !== candleId);
                yield cart.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.candleService = new CandleService();
