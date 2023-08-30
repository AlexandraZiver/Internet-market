import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const generateJWT = (id: number, email: string, next: NextFunction): string => {
  try {
    const token = jwt.sign({ id, email }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    if (!token) {
      throw new Error("This token is incorrect");
    }
    return token;
  } catch (err) {
    next(err);
  }
};

export default generateJWT;
