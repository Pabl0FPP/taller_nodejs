"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    id_candle: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Candle",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true, collection: "cartitems" });
exports.CartItemModel = (0, mongoose_1.model)("CartItem", cartItemSchema);
