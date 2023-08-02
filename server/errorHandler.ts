import { Request, Response, NextFunction } from "express";

import { InternalError, BaseError } from "./errors";
import logger from "./winston";

const getErrorByStatusCode = (statusCode: number, message: string): BaseError | InternalError => {
  switch (statusCode) {
    case 500:
      return new InternalError(message);
    default:
      return new BaseError(message, statusCode);
  }
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  const statusCode: number = (err && err.code) || 500;
  const message: string = (err && err.message) || "Something went wrong";

  const errorByStatusCode = getErrorByStatusCode(statusCode, message);

  logger.error(errorByStatusCode);

  return res.status(statusCode).json(errorByStatusCode.toJSON());
};

export default errorHandler;
