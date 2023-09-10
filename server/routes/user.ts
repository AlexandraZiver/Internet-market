import Router from "express";

import UserController from "../controllers/user";
import injectUser from "../middleware/injectUser";

const userRouter = Router();

userRouter.get("/me", injectUser, UserController.getInfo);
userRouter.delete("/:id", injectUser, UserController.delete);

export default userRouter;
