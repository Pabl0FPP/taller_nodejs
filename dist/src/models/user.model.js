"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    roles: [{
            ref: "Role",
            type: mongoose_1.Schema.Types.ObjectId
        }]
}, { timestamps: true, collection: "users" });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
