import { Response, Request, NextFunction } from "express";

import AuthenticatedRequest from "../interfaces/authenticatedRequest";
import User from "../interfaces/user";
import getUserId from "../services/getUserId";
import UserDB from "../services/user";

class UserController {
  public async getUserInfo(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const user: User = await UserDB.getUserById(req.user.id, next);

    return res.json(user);
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = getUserId(req, next);
      UserDB.deleteUser(id, next);
      UserDB.deleteUser(id, next);
      res.json("User was delete successfully");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
