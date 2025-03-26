import { containerController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";
import { Router } from "express";

export const containerRouter = Router();

containerRouter.post("/", [authenticateJWT, isAdmin], containerController.createContainer);
containerRouter.get("/", [authenticateJWT, isAdmin], containerController.getAllContainers);
containerRouter.get("/:id", [authenticateJWT, isAdmin], containerController.getContainer);
containerRouter.put("/:id", [authenticateJWT, isAdmin], containerController.updateContainer);
containerRouter.delete("/:id", [authenticateJWT, isAdmin], containerController.deleteContainer);


