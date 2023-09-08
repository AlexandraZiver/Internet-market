import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";

import { User } from "../interfaces/user";
import {
  comparePassword,
  validateLoginVariables,
  generateJWT,
  sendConfirmationCode,
} from "../services/auth";
import Basket from "../services/db/basket";
import UserDB from "../services/db/user";

interface RegistrationRequestBody extends User {
  confirmCode: string;
  id: number;
  passwordСonfirm: string;
}
interface AuthenticatedRequest extends Request {
  user: User;
}
const SOLT = 5;
class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const { userName, email, password, passwordСonfirm }: RegistrationRequestBody = req.body;
    const hashPassword: string = await bcrypt.hash(password, SOLT);
    const code = await sendConfirmationCode(req);

    const hashConfirmCode = await bcrypt.hash(code, SOLT);
    const user = await UserDB.createUser(userName, email, hashPassword, hashConfirmCode);

    const basket = await Basket.createBasketForUser(user.id);

    const token = generateJWT(user.id, email);
    return res.json(token);
  }

  public async confirmCode(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const { code } = req.body;
      const { confirmCode } = await UserDB.getById(id);

      comparePassword(code, confirmCode);

      await UserDB.updateConfirmStatus(id);
    } catch (err) {
      next(err);
    }
  }

  public async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    validateLoginVariables(email, password);
    const checkUser = await UserDB.getByEmail(email);

    comparePassword(password, checkUser.password);

    const token = generateJWT(checkUser.id, checkUser.email);

    return res.json(token);
  }

  public async checkJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = generateJWT(req.user.id, req.user.email);

    return res.json({ token });
  }
}

export default new AuthController();
