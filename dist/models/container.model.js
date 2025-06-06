"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerModel = void 0;
const mongoose_1 = require("mongoose");
const containerSchema = new mongoose_1.Schema({
    material: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    description: { type: String, required: true }
}, { timestamps: true, collection: "containers" });
exports.ContainerModel = (0, mongoose_1.model)("Container", containerSchema);
