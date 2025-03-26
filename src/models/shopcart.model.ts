import { Schema, model, Document } from "mongoose";

export interface ShopCartDocument extends Document {
    id_user: string,
    items:
    { _id: Schema.Types.ObjectId, quantity: number}[];
}

const shopCartSchema = new Schema({
    id_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        _id: { type: Schema.Types.ObjectId, ref: "Candle" },
        quantity: { type: Number, required: true }
    }]
}, { timestamps: true, collection: "shopcarts" });

export const ShopCartModel = model<ShopCartDocument>("ShopCart", shopCartSchema);