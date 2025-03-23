import { Schema, model, Document } from "mongoose";

export interface FraganceDocument extends Document {
    id_fragance: String;
    name: string,
    description: string,
    color: string,
    image_url: string;
}

const fraganceSchema = new Schema({
    id_fragance: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    image_url: { type: String, required: false }
},{timestamps:true, collection: "fragances"});

export const FraganceModel = model<FraganceDocument>("Fragance", fraganceSchema);