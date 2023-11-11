import { Request } from "express";
import jwt from "jsonwebtoken";

const checkUser = (req: Request): boolean => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return false;
    }

    jwt.verify(token, process.env.SECRET_KEY);

    return true;
  } catch (err) {
    return false;
  }
};

export default checkUser;
