import { Request, Response } from 'express';
import { shopcartService } from '../services';

class ShopCartController {
    public async getCart(req: Request, res: Response) {
        try {
            const userId = req.body.loggedUser.id;
            const cart = await shopcartService.getOrCreateCart(userId);
            res.json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async addToCart(req: Request, res: Response) {
        try {
            const userId = req.body.loggedUser.id;
            const { id_candle, quantity } = req.body;
            
            const cart = await shopcartService.addItemToCart(userId, {
                id_candle,
                quantity: quantity || 1
            });
            
            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const shopcartController = new ShopCartController();