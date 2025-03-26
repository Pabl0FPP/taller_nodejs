import { Schema, model, Document } from "mongoose";
import { FraganceInput } from "../interfaces";

export interface FraganceDocument extends FraganceInput, Document {
    createdAt: Date,
    deletedAt: Date,
    updatedAt: Date;
}

const fraganceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    image_url: { type: String, required: false }
},{timestamps:true, collection: "fragances"});

export const FraganceModel = model<FraganceDocument>("Fragance", fraganceSchema);