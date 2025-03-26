import { Schema, model, Document } from "mongoose";

export interface CartItemDocument extends Document {
    id_candle: string,
    quantity: number;
}

const cartItemSchema = new Schema({
    id_candle: { 
        type: Schema.Types.ObjectId, 
        ref: "Candle",
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true, collection: "cartitems" });

export const CartItemModel = model<CartItemDocument>("CartItem", cartItemSchema);