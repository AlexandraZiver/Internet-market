import Router from "express";

import AuthController from "../controllers/auth";
import injectUser from "../middleware/injectUser";
import validateRegistrationBody from "../services/validateRegistrationBody";

const authRouter = Router();

authRouter.post("/registr", validateRegistrationBody, AuthController.registr);
authRouter.post("/login", AuthController.login);
authRouter.get("/", injectUser, AuthController.checkJWT);
authRouter.post("/confirm/:id", injectUser, AuthController.confirmCode);

export default authRouter;
