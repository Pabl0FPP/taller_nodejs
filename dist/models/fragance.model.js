"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraganceModel = void 0;
const mongoose_1 = require("mongoose");
const fraganceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    image_url: { type: String, required: false }
}, { timestamps: true, collection: "fragances" });
exports.FraganceModel = (0, mongoose_1.model)("Fragance", fraganceSchema);
