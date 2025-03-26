import { fraganceController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";
import { Router } from "express";

export const fraganceRouter = Router();

fraganceRouter.post("/", [authenticateJWT, isAdmin], fraganceController.createFragance);
fraganceRouter.get("/", [authenticateJWT, isAdmin], fraganceController.getAllFragances);
fraganceRouter.get("/:id", [authenticateJWT, isAdmin], fraganceController.getFragance);
fraganceRouter.put("/:id", [authenticateJWT, isAdmin], fraganceController.updateFragance);
fraganceRouter.delete("/:id", [authenticateJWT, isAdmin], fraganceController.deleteFragance);





