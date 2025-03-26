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
exports.candleController = void 0;
const services_1 = require("../services");
class CandleController {
    createCandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.loggedUser.id;
                const candleInput = req.body;
                // Crear la vela personalizada
                const newCandle = yield services_1.candleService.createCandle(candleInput);
                // Agregar la vela al carrito del usuario con cantidad 1 por defecto
                const cart = yield services_1.shopcartService.addItemToCart(userId, {
                    id_candle: newCandle._id,
                    quantity: 1
                });
                res.status(201).json({
                    candle: newCandle,
                    cart: cart
                });
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Error creating candle: " + error.message });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getCandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const candle = yield services_1.candleService.getCandleById(id);
                if (!candle) {
                    res.status(404).json({ message: `Candle with id ${id} not found` });
                    return;
                }
                res.json(candle);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.candleController = new CandleController();
