import { Router } from "express";
import { userController } from "../controllers";

export const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUsers);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id",userController.deleteUser);
