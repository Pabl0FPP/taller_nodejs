import { Router } from "express";
import { shopcartController } from "../controllers";
import { authenticateJWT } from "../middleware";

export const shopcartRouter = Router();

shopcartRouter.get("/", authenticateJWT, shopcartController.getCart);
shopcartRouter.post("/", authenticateJWT, shopcartController.addToCart);