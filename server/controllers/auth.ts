import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";

import AuthenticatedRequest from "../interfaces/authenticatedRequest";
import RegistrationRequestBody from "../interfaces/registrationRequestBody";
import User from "../interfaces/user";
import checkInput from "../services/checkInput";
import comparePassword from "../services/comparePassword";
import generateJWT from "../services/createJWT";
import sendConfirmationCode from "../services/sendConfirmationCode";
import UserDB from "../services/user";

class AuthController {
  public async registr(
    req: Request<object, object, RegistrationRequestBody>,
    res: Response,
    next: NextFunction,
  ) {
    const { userName, email, password, passwordСonfirm } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 5);
    const code = await sendConfirmationCode(req, res, next);

    const hashConfirmCode = await bcrypt.hash(`${code}`, 5);
    const user = await UserDB.createUser(userName, email, hashPassword, hashConfirmCode, next);

    const basket: { id: number } = await UserDB.createBasketForUser(user.id, next);

    const token: string = generateJWT(user.id, email, next);
    return res.json(token);
  }

  public async confirmCode(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const { code } = req.body;
      const { confirmCode }: User = await UserDB.getUserById(id, next);

      comparePassword(code, confirmCode, next);

      await UserDB.updateUserConfirmStatus(id, next);
    } catch (err) {
      next(err);
    }
  }

  public async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    checkInput(email, password, next);
    const checkUser: User = await UserDB.getUserByEmail(email, next);

    comparePassword(password, checkUser.password, next);

    const token: string = generateJWT(checkUser.id, checkUser.email, next);

    return res.json(token);
  }

  public async checkJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token: string = generateJWT(req.user.id, req.user.email, next);

    return res.json({ token });
  }
}

export default new AuthController();
