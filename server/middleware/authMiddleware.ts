import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user: User;
}
interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string;
}
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token: string = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
export default authMiddleware;
