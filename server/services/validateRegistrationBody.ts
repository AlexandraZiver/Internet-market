import { Request, Response, NextFunction } from "express";
import validator from "validator";

import models from "../models";
import User from "../models/User";

const validateRegistrationBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      userName,
      email,
      password,
      passwordСonfirm,
    }: {
      userName: string;
      email: string;
      password: string;
      passwordСonfirm: string;
    } = req.body;

    if (!userName || !email || !password) {
      throw new Error("Please enter all input fields.");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter a correct email.");
    }

    const candidate: User | null = await models.User.findOne({ where: { email } });
    if (candidate) {
      throw new Error("This email is already registered.");
    }

    if (!validator.isByteLength(password, { min: 8, max: undefined })) {
      throw new Error("Please enter a password longer than 8 characters.");
    }

    if (!validator.isAlphanumeric(password)) {
      throw new Error("The password must contain only letters and numbers.");
    }

    if (password.toLowerCase() !== passwordСonfirm.toLowerCase()) {
      throw new Error("Passwords must be the same.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRegistrationBody;
