import { NextFunction } from "express";

const checkInput = (email: string, password: string, next: NextFunction) => {
  try {
    if (!email || !password) {
      throw new Error("please enter all input fields for Enter.");
    }
  } catch (err) {
    next(err);
  }
};

export default checkInput;
