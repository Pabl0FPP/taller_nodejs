import { CandleModel, CandleDocument } from "../models/candle.model";
import { ShopCartModel } from "../models/shopcart.model";
import { ObjectId } from "mongoose";

class CandleService{

    public async createCandle(candleInput: Partial<CandleDocument>, userId: string): Promise<CandleDocument> {
        try {

            const candle = await CandleModel.create(candleInput);
            await candle.populate("fragance"); 

            const cart = await ShopCartModel.findOne({ id_user: userId });
            if (!cart) {
                await ShopCartModel.create({
                    id_user: userId,
                    items: [{ _id: candle._id, quantity: 1 }]
                });
            } else {
                
                const existingItem = cart.items.find(item => item._id.toString() === (candle._id as ObjectId ).toString());
                if (existingItem) {
                    // Si la vela ya está en el carrito, incrementar la cantidad
                    existingItem.quantity += 1;
                } else {
                    // Si no está en el carrito, añadirla
                    cart.items.push({ _id: candle._id as ObjectId, quantity: 1 });
                }
                await cart.save();
            }

            return candle;
        } catch (error) {
            throw error;
        }
    }

    public async getCandles(userId: string): Promise<CandleDocument[]> {
        try {
            const cart = await ShopCartModel.findOne({ id_user: userId }).populate("items._id");
            if (!cart) {
                throw new Error("Cart not found for the user");
            }
    
            // Asegúra que items._id sea del tipo CandleDocument
            return cart.items.map(item => {
                if (item._id instanceof CandleModel) {
                    return item._id as CandleDocument;
                }
                throw new Error("Item is not a valid CandleDocument");
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async getCandleById(userId: string, candleId: string): Promise<CandleDocument | null> {
        try {
            const cart = await ShopCartModel.findOne({ id_user: userId }).populate("items._id");
            if (!cart) {
                throw new Error("Cart not found for the user");
            }
    
            const item = cart.items.find(item => item._id.toString() === candleId);
            if (!item) {
                return null; 
            }
    
            // Validar que el item._id sea una instancia de CandleModel
            if (item._id instanceof CandleModel) {
                return item._id as CandleDocument;
            }
    
            // Si no es una instancia válida, lanzar un error
            throw new Error("Item is not a valid CandleDocument");
        } catch (error) {
            throw error;
        }
    }

    public async updateCandle(userId: string, candleId: string, updateData: Partial<CandleDocument>): Promise<CandleDocument | null> {
        try {
            const cart = await ShopCartModel.findOne({ id_user: userId }).populate("items._id");
            if (!cart) {
                throw new Error("Cart not found for the user");
            }
    
            const item = cart.items.find(item => item._id.toString() === candleId);
            if (!item) {
                return null;
            }
    
            if (!(item._id instanceof CandleModel)) {
                throw new Error("Item is not a valid CandleDocument");
            }
    
            // Actualizar las propiedades de la vela
            const candle = item._id as CandleDocument;
            Object.assign(candle, updateData); 
            await candle.save(); 
    
            return candle;
        } catch (error) {
            throw error;
        }
    }
    
    public async deleteCandle(userId: string, candleId: string): Promise<void> {
        try {

            const cart = await ShopCartModel.findOne({ id_user: userId });
            if (!cart) {
                throw new Error("Cart not found for the user");
            }
    
            cart.items = cart.items.filter(item => item._id.toString() !== candleId);
            await cart.save();
        } catch (error) {
            throw error;
        }
    }
}

export const candleService = new CandleService();