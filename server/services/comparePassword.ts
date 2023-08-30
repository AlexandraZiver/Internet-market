import bcrypt from "bcrypt";
import { NextFunction } from "express";

const comparePassword = async (
  enteredPassword: string,
  userPassword: string,
  next: NextFunction,
) => {
  try {
    const result: boolean = await bcrypt.compare(enteredPassword, userPassword);
    if (!result) {
      throw new Error("This is incorrect");
    }
  } catch (err) {
    next(err);
  }
};

export default comparePassword;
