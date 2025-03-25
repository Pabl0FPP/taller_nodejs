import { Schema, model, Document } from "mongoose";
import { ContainerInput } from "../interfaces";

export interface ContainerDocument extends ContainerInput, Document {
    createdAt: Date,
    deletedAt: Date,
    updatedAt: Date;
}

const containerSchema = new Schema({
    id_container: { type: String, unique: true, index: true, required: true },
    material: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    description: { type: String, required: true }
},{timestamps:true, collection: "containers"});

export const ContainerModel = model<ContainerDocument>("Container", containerSchema);