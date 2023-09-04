import { Response, Request, NextFunction } from "express";

import { User } from "../interfaces/user";
import UserDB from "../services/user";

interface AuthenticatedRequest extends Request {
  user: User;
}
class UserController {
  public async getUserInfo(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const user: User = await UserDB.getUserById(req.user.id);

    return res.json(user);
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id);
      if (!id) {
        throw new Error("NOT ID");
      }
      UserDB.deleteUser(id);
      res.json("User was deleted successfully");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
