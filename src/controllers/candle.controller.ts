import { Request, Response } from 'express';
import { CandleDocument } from '../models';
import { candleService, shopcartService } from '../services';
import { CandleInput } from '../interfaces';

class CandleController {
    public async createCandle(req: Request, res: Response) {
        try {
            const userId = req.body.loggedUser.id;
            const candleInput = req.body as CandleInput;
            
            // Crear la vela personalizada
            const newCandle = await candleService.createCandle(candleInput);
            
            // Agregar la vela al carrito del usuario con cantidad 1 por defecto
            const cart = await shopcartService.addItemToCart(userId, {
                id_candle: newCandle._id as string,
                quantity: 1
            });

            res.status(201).json({
                candle: newCandle,
                cart: cart
            });
            
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "Error creating candle: " + error.message });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getCandle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const candle = await candleService.getCandleById(id);
            
            if (!candle) {
                res.status(404).json({ message: `Candle with id ${id} not found` });
                return;
            }
            
            res.json(candle);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const candleController = new CandleController();