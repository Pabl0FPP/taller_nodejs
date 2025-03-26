import { Router } from "express";
import { candleController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";

export const candleRouter = Router();

candleRouter.post("/", [authenticateJWT], candleController.createCandle);
candleRouter.get("/:id", [authenticateJWT], candleController.getCandle);