import { Router } from "express";
import { candleController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";

export const candleRouter = Router();

candleRouter.post("/candles", [authenticateJWT], candleController.createCandle);
candleRouter.get("/candles", [authenticateJWT], candleController.getCandles);
candleRouter.get("/candles/:id", [authenticateJWT], candleController.getCandleById);
candleRouter.put("/candles/:id", [authenticateJWT], candleController.updateCandle);
candleRouter.delete("/candles/:id", [authenticateJWT], candleController.deleteCandle);