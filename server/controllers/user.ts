import { Response, Request, NextFunction } from "express";

import { User } from "../interfaces/user";
import UserDB from "../services/db/user";

interface AuthenticatedRequest extends Request {
  user: User;
}
class UserController {
  public async getInfo(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const user: User = await UserDB.getById(req.user.id);

    return res.json(user);
  }

  public async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const id: number = parseInt(req.params.id);
    const user = req.user;
    if (!id) {
      res.status(400).json({ error: "Missing required field 'id'" });
    }
    await UserDB.delete(id, user);
    res.json("User was deleted successfully");
  }
}

export default new UserController();
