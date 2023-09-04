import Router from "express";

import UserController from "../controllers/user";
import injectUser from "../middleware/injectUser";

const userRouter = Router();

userRouter.get("/:id", injectUser, UserController.getUserInfo);
userRouter.delete("/:id", injectUser, UserController.deleteUser);

export default userRouter;
