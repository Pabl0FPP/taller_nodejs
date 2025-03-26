import { ShopCartDocument, ShopCartModel, CartItemModel } from "../models";
import { ShopCartInput, CartItemInput } from "../interfaces";

class ShopCartService {
    public async getOrCreateCart(userId: string): Promise<ShopCartDocument> {
        try {
            let cart = await ShopCartModel.findOne({ id_user: userId })
                .populate({
                    path: 'items._id',
                    populate: [
                        { path: 'id_container' },
                        { path: 'id_fragance' }
                    ]
                });

            if (!cart) {
                cart = await ShopCartModel.create({ id_user: userId, items: [] });
            }

            return cart;
        } catch (error) {
            throw error;
        }
    }

    public async addItemToCart(userId: string, itemInput: CartItemInput): Promise<ShopCartDocument> {
        try {
            const cart = await this.getOrCreateCart(userId);
            
            // Verificar si el item ya existe en el carrito
            const existingItemIndex = cart.items.findIndex(
                item => item._id.toString() === itemInput.id_candle
            );

            if (existingItemIndex >= 0) {
                // Si ya existe, incrementar la cantidad
                cart.items[existingItemIndex].quantity += itemInput.quantity;
            } else {
                // Si no existe, agregar nuevo item
                cart.items.push({
                    _id: itemInput.id_candle as any,
                    quantity: itemInput.quantity
                });
            }

            await cart.save();
            return cart.populate({
                path: 'items._id',
                populate: [
                    { path: 'id_container' },
                    { path: 'id_fragance' }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    public async removeItemFromCart(userId: string, candleId: string): Promise<ShopCartDocument> {
        try {
            const cart = await this.getOrCreateCart(userId);
            cart.items = cart.items.filter(item => item._id.toString() !== candleId);
            await cart.save();
            return cart.populate({
                path: 'items._id',
                populate: [
                    { path: 'id_container' },
                    { path: 'id_fragance' }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

}

export const shopcartService = new ShopCartService();