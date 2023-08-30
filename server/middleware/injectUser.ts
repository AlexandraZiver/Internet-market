import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import checkUser from "./checkUser";
import AuthenticatedRequest from "../interfaces/authenticatedRequest";

const injectUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const isUserAuthenticated = await checkUser(req, res, next);
    if (!isUserAuthenticated) {
      throw new Error("Unauthorized");
    }

    const token: string = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default injectUser;
