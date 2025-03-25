import { fraganceController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";
import { Router } from "express";

export const fraganceRouter = Router();

fraganceRouter.post("/", [authenticateJWT, isAdmin], fraganceController.create);
fraganceRouter.get("/", [authenticateJWT, isAdmin], fraganceController.getAll);
fraganceRouter.get("/search", [authenticateJWT, isAdmin], fraganceController.get);
fraganceRouter.get("/:id", [authenticateJWT, isAdmin], fraganceController.getById);
fraganceRouter.put("/:id", [authenticateJWT, isAdmin], fraganceController.update);
fraganceRouter.delete("/:id", [authenticateJWT, isAdmin], fraganceController.delete);





