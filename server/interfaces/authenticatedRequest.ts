import { Request } from "express";

import User from "./user";

interface AuthenticatedRequest extends Request {
  user: User;
}
export default AuthenticatedRequest;
