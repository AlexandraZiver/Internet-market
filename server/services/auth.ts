import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import validator from "validator";

import errorHandler from "./errorHandler";
import models from "../models";
import User from "../models/User";

export const validateLoginVariables = (email: string, password: string) => {
  if (!email || !password) {
    errorHandler(new Error("Please enter all input fields for Enter."));
  }
};

export const comparePassword = async (enteredPassword: string, userPassword: string) => {
  const result: boolean = await bcrypt.compare(enteredPassword, userPassword);
  if (!result) {
    errorHandler(new Error("This password is incorrect"));
  }
};

export const generateJWT = (id: number, email: string): string | Error => {
  const token = jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  if (!token) {
    errorHandler(new Error("This token is incorrect"));
  }
  return token;
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
  host: "smtp.gmail.com",
  port: 587,
});

export const sendConfirmationCode = async (req: Request): Promise<string | Error> => {
  const randomCode = nanoid(4);
  const email: string = req.body.email;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Confirmation Email",
    text: `Your confirmation code: ${randomCode}`,
  };

  if (!randomCode) {
    errorHandler(new Error("Code wasn't generated"));
  }
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    errorHandler(new Error("Error sending confirmation email:"));
  }

  return randomCode;
};

export const validateRegisterBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      userName,
      email,
      password,
      passwordConfirm,
    }: {
      userName: string;
      email: string;
      password: string;
      passwordConfirm: string;
    } = req.body;

    if (!userName || !email || !password || !passwordConfirm) {
      throw new Error("Please enter all input fields.");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter a correct email.");
    }

    const candidate: User | null = await models.User.findOne({ where: { email } });
    if (candidate) {
      throw new Error("This email is already registered.");
    }

    if (password.length < 8) {
      throw new Error("Please enter a password longer than 8 characters.");
    }

    if (!validator.isAlphanumeric(password)) {
      throw new Error("The password must contain only letters and numbers.");
    }

    if (password.toLowerCase() !== passwordConfirm.toLowerCase()) {
      throw new Error("Passwords must be the same.");
    }
    next();
  } catch (error) {
    next(error);
  }
};
