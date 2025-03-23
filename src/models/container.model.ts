import { Schema, model, Document } from "mongoose";

export interface ContainerDocument extends Document {
    id_container: string,
    material: string,
    height: number,
    width: number,
    description: string;
}

const containerSchema = new Schema({
    id_container: { type: String, required: true },
    material: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    description: { type: String, required: true }
},{timestamps:true, collection: "containers"});

export const ContainerModel = model<ContainerDocument>("Container", containerSchema);