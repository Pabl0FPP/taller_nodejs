"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleModel = void 0;
const mongoose_1 = require("mongoose");
const candleSchema = new mongoose_1.Schema({
    id_container: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Container",
        required: true
    },
    id_fragance: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Fragance",
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    }
}, { timestamps: true, collection: "candles" });
exports.CandleModel = (0, mongoose_1.model)("Candle", candleSchema);
