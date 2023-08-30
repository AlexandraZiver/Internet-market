import { NextFunction, Request } from "express";

const getUserId = (req: Request, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    if (!id) {
      throw new Error("NOT ID");
    }
    return id;
  } catch (err) {
    next(err);
  }
};

export default getUserId;
