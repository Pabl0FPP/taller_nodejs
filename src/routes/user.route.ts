import { Router } from "express";
import { userController } from "../controllers";
import { authenticateJWT, isAdmin, validateSchema } from "../middleware";
import { userSchema } from "../schemas";

export const userRouter = Router();

userRouter.get("/", [authenticateJWT, isAdmin], userController.getUsers);
userRouter.post("/", [authenticateJWT, isAdmin], validateSchema(userSchema), userController.createUser);
userRouter.get("/:id", [authenticateJWT, isAdmin],userController.getUser);
userRouter.put("/:id", [authenticateJWT, isAdmin],userController.updateUser);
userRouter.delete("/:id", [authenticateJWT, isAdmin],userController.deleteUser);