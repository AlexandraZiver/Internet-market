import Router from "express";

import AuthController from "../controllers/auth";
import injectUser from "../middleware/injectUser";
import { validateRegistrationBody } from "../services/auth";

const authRouter = Router();

authRouter.post("/register", validateRegistrationBody, AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/", injectUser, AuthController.checkJWT);
authRouter.post("/confirm/:id", injectUser, AuthController.confirmCode);

export default authRouter;
