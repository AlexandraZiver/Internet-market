import { Response, Request, NextFunction } from "express";

import { User } from "../interfaces/user";
import UserDB from "../services/db/user";

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
    const id: number = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ error: "Missing required field 'id'" });
    }
    UserDB.deleteUser(id);
    res.json("User was deleted successfully");
  }
}

export default new UserController();
