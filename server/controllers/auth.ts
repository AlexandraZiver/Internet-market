import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";

import { User } from "../interfaces/user";
import {
  comparePassword,
  validateLoginVariables,
  generateJWT,
  sendConfirmationCode,
} from "../services/auth";
import UserDB from "../services/user";

interface RegistrationRequestBody extends User {
  confirmCode: string;
  id: number;
  passwordСonfirm: string;
}
interface AuthenticatedRequest extends Request {
  user: User;
}
class AuthController {
  public async register(
    req: Request<object, object, RegistrationRequestBody>,
    res: Response,
    next: NextFunction,
  ) {
    const { userName, email, password, passwordСonfirm } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 5);
    const code = await sendConfirmationCode(req as Request);

    const hashConfirmCode = await bcrypt.hash(`${code}`, 5);
    const user = await UserDB.createUser(userName, email, hashPassword, hashConfirmCode);

    const basket: { id: number } = await UserDB.createBasketForUser(user.id);

    const token: string = generateJWT(user.id, email);
    return res.json(token);
  }

  public async confirmCode(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const { code } = req.body;
      const { confirmCode }: User = await UserDB.getUserById(id);

      comparePassword(code, confirmCode);

      await UserDB.updateUserConfirmStatus(id);
    } catch (err) {
      next(err);
    }
  }

  public async login(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    validateLoginVariables(email, password);
    const checkUser: User = await UserDB.getUserByEmail(email);

    comparePassword(password, checkUser.password);

    const token: string = generateJWT(checkUser.id, checkUser.email);

    return res.json(token);
  }

  public async checkJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token: string = generateJWT(req.user.id, req.user.email);

    return res.json({ token });
  }
}

export default new AuthController();
