import { containerController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";
import { Router } from "express";

export const containerRouter = Router();

containerRouter.post("/", [authenticateJWT, isAdmin], containerController.create);
containerRouter.get("/", [authenticateJWT, isAdmin], containerController.getAll);
containerRouter.get("/search", [authenticateJWT, isAdmin], containerController.get);
containerRouter.get("/:id", [authenticateJWT, isAdmin], containerController.getById);
containerRouter.put("/:id", [authenticateJWT, isAdmin], containerController.update);
containerRouter.delete("/:id", [authenticateJWT, isAdmin], containerController.delete);


