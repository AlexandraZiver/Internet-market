import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "./../interfaces/user";
import checkUser from "./checkUser";

interface AuthenticatedRequest extends Request {
  user: User;
}

const injectUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const isUserAuthenticated = await checkUser(req);
    if (!isUserAuthenticated) {
      throw new Error("Unauthorized");
    }

    const token: string = req.headers.authorization?.split(" ")[1];
    const decoded: User = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default injectUser;
