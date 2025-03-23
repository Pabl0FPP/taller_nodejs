import { Schema, model, Document } from "mongoose";

export interface CandleDocument extends Document {
    id_container: string,
    id_fragance: string,
    id_user: string,
    image_url: string,
    text: string;
}

const candleSchema = new Schema({
    id_container: { 
        type: Schema.Types.ObjectId, 
        ref: "Container",
        required: true 
    },
    id_fragance: { 
        type: Schema.Types.ObjectId, 
        ref: "Fragance", 
        required: true 
    },
    id_user: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    image_url: { 
        type: String, 
        required: false 
    },
    text: { 
        type: String, 
        required: false 
    }
}, { timestamps: true, collection: "candles" });

export const CandleModel = model<CandleDocument>("Candle", candleSchema);