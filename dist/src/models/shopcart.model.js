"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCartModel = void 0;
const mongoose_1 = require("mongoose");
const shopCartSchema = new mongoose_1.Schema({
    id_user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
            _id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Candle" },
            quantity: { type: Number, required: true }
        }]
}, { timestamps: true, collection: "shopcarts" });
exports.ShopCartModel = (0, mongoose_1.model)("ShopCart", shopCartSchema);
