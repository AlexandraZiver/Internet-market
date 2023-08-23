import Router from "express";

import UserController from "../controllers/user.controllers";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/registration", UserController.registration);
userRouter.post("/login", UserController.login);
userRouter.get("/auth", authMiddleware, UserController.check);
userRouter.get("/me/:id", authMiddleware, UserController.getInfoUser);
userRouter.delete("/delete/:id", authMiddleware, UserController.deleteUser);
userRouter.post("/confirm/:id", authMiddleware, UserController.confirm);

export default userRouter;
