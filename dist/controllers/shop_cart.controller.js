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
exports.shopcartController = void 0;
const services_1 = require("../services");
class ShopCartController {
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.loggedUser.id;
                const cart = yield services_1.shopcartService.getOrCreateCart(userId);
                res.json(cart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.loggedUser.id;
                const { id_candle, quantity } = req.body;
                const cart = yield services_1.shopcartService.addItemToCart(userId, {
                    id_candle,
                    quantity: quantity || 1
                });
                res.status(201).json(cart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.shopcartController = new ShopCartController();
