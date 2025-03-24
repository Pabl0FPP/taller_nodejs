import { Schema, model, Document } from "mongoose";

export interface RoleDocument extends Document {
    name: string;
}

const roleSchema = new Schema({
    name: String
})

export const RoleModel = model<RoleDocument>("Role", roleSchema)