import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";

import models from "../models";
import sendConfirmedCode from "../tools/sendConfirmationEmail";

interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string;
  confirmCode: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

const generateJWT = (id: number, email: string, role: string): string => {
  const token = jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

class UserController {
  public async registration(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const {
      userName,
      email,
      password,
      passwordСonfirm,
      role,
    }: {
      userName: string;
      email: string;
      passwordСonfirm: string;
      password: string;
      role: string;
    } = await req.body;

    try {
      if (!userName || !email || !password) {
        throw new Error("Please enter all input fields.");
      }
      if (!validator.isEmail(email)) {
        throw new Error("Please enter correct email.");
      }
      const candidate: User = await models.User.findOne({ where: { email } });
      if (candidate) {
        throw new Error("This email is already registered");
      }

      if (!validator.isByteLength(password, { min: 8, max: undefined })) {
        throw new Error("Please enter a password longer than 8 symbols");
      }

      if (!validator.isAlphanumeric(password)) {
        throw new Error("The password must contain only letter and number");
      }

      if (password !== passwordСonfirm) {
        throw new Error("Passwords must be the same");
      }

      const hashPassword: string = await bcrypt.hash(password, 5);
      const code = await sendConfirmedCode(req, res, next);
      if (!code) {
        throw new Error("Code wasn't generated");
      }

      const hashConfirmCode = await bcrypt.hash(`${code}`, 5);
      const user: User = await models.User.create({
        userName,
        email,
        password: hashPassword,
        role,
        confirmCode: hashConfirmCode,
      });

      const basket: { id: number } = await models.Basket.create({
        userId: user.id,
      });

      const token: string = generateJWT(user.id, email, user.role);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  public async confirm(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const id: number = parseInt(req.params.id);
      const code: string = await req.body.code;
      const { confirmCode }: User = await models.User.findOne({ where: { id: id } });
      if (!(await bcrypt.compare(code, confirmCode))) {
        throw new Error("Incorrect confirm code ");
      }

      await models.User.update({ confirm: true, confirmCode: "" }, { where: { id } });
      return res.json("Confirm was successfully");
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { email, password }: { email: string; password: string } = await req.body;

    try {
      if (!email || !password) {
        throw new Error("please enter all input fields for Enter.");
      }
    } catch (error) {
      next(error);
    }

    const checkUser: User = await models.User.findOne({ where: { email } });

    try {
      if (!checkUser) {
        throw new Error(" Your email not registered");
      }

      const result: boolean = await bcrypt.compare(password, checkUser.password);
      if (!result) {
        throw new Error("Password is incorrect");
      }

      const token: string = generateJWT(checkUser.id, checkUser.email, checkUser.role);

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  public async check(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const token: string = generateJWT(req.user.id, req.user.email, req.user.role);
      if (!token) {
        throw new Error();
      }
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  public async getInfoUser(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const user: User = await models.User.findOne({ where: { id: req.user.id } });
      if (!user) {
        throw new Error("User not found");
      }
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      if (!id) {
        throw new Error("NOT ID");
      }
      const deleteUserCount: number = await models.User.destroy({ where: { id } });
      const deleteBasketCount: number = await models.Basket.destroy({ where: { userId: id } });
      if (!deleteUserCount && !deleteBasketCount) {
        throw new Error("User wasn't deleted");
      }
      res.json("User was delete successfully");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
