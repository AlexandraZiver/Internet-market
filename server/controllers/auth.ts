import { Response, Request } from "express";

import { User } from "../interfaces/user";
import {
  comparePassword,
  validateLoginVariables,
  generateJWT,
  sendConfirmationCode,
} from "../services/auth";
import Basket from "../services/db/basket";
import UserDB from "../services/db/user";
import errorHandler from "../services/errors";

interface RegistrationRequestBody extends User {
  confirmCode: string;
  id: number;
  passwordСonfirm: string;
}
interface AuthenticatedRequest extends Request {
  user: User;
}

class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { userName, email, password }: RegistrationRequestBody = req.body;

      const code = await sendConfirmationCode(email);
      const user = await UserDB.createUser(userName, email, password, code);

      const basket = await Basket.createBasketForUser(user.id);

      const token = generateJWT(user.id, email);
      return res.json(token);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  public async confirmCode(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const { code } = req.body;
      const user = await UserDB.getById(id);
      await comparePassword(code, user.confirmCode);
      await UserDB.updateConfirmStatus(id);
      return res.json({ ok: true });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  public async login(req: AuthenticatedRequest, res: Response) {
    try {
      const { email, password } = req.body;
      await validateLoginVariables(email, password);

      const checkUser = await UserDB.getByEmail(email);
      await comparePassword(password, checkUser.password);
      const token = generateJWT(checkUser.id, checkUser.email);

      return res.json(token);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  public async checkJWT(req: AuthenticatedRequest, res: Response) {
    const token = generateJWT(req.user.id, req.user.email);

    return res.json({ token });
  }
}

export default new AuthController();
