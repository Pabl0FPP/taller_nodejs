import { Router } from "express";
import { userController } from "../controllers";
import { authenticateJWT, isAdmin } from "../middleware";

export const userRouter = Router();

userRouter.get("/", [authenticateJWT, isAdmin], userController.getUsers);
userRouter.post("/", [authenticateJWT, isAdmin],userController.createUser);
userRouter.get("/:id", [authenticateJWT, isAdmin],userController.getUser);
userRouter.put("/:id", [authenticateJWT, isAdmin],userController.updateUser);
userRouter.delete("/:id", [authenticateJWT, isAdmin],userController.deleteUser);