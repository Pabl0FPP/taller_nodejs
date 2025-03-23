import { Schema, model, Document } from "mongoose";
import { UserInput } from "../interfaces";

export interface UserDocument extends UserInput, Document{
    createdAt: Date, 
    updateAt: Date,
    deleteAt: Date,
    roles: { _id: Schema.Types.ObjectId, name: string }[];
}

const userSchema = new Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, index: true, unique: true }, 
    password: { type: String, required: true },
    roles:[{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
    },{timestamps:true, collection: "users"});

export const UserModel = model<UserDocument>("User", userSchema); 