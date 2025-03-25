import { Request, Response } from "express";
import { candleService } from "../services/candle.service";

export class CandleController {
    public async createCandle(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const candle = await candleService.createCandle(req.body, userId);
            res.status(201).json(candle);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getCandles(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const candles = await candleService.getCandles(userId);
            res.status(200).json(candles);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getCandleById(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const candleId: string = req.params.id;
            const candle = await candleService.getCandleById(userId, candleId);
            if (!candle) {
                res.status(404).json({ message: `Candle with id ${candleId} not found in user's cart` });
                return;
            }
            res.status(200).json(candle);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async updateCandle(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const candleId: string = req.params.id;
            const candle = await candleService.updateCandle(userId, candleId, req.body);
            if (!candle) {
                res.status(404).json({ message: `Candle with id ${candleId} not found in user's cart` });
                return;
            }
            res.status(200).json(candle);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async deleteCandle(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const candleId: string = req.params.id;
            await candleService.deleteCandle(userId, candleId);
            res.status(200).json({ message: "Candle deleted successfully from user's cart" });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export const candleController = new CandleController();