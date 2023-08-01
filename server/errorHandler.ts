import { Request, Response, NextFunction } from "express";

import { InternalError, BaseError } from "./errorCodes";
import logger from "./winston";

interface ErrorJson {
  name: string;
  statusCode: number;
  message: string;
}
interface Error {
  statusCode: number;
  message: string;
  toJSON(): ErrorJson;
}

interface Err {
  code: number;
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const code: number = (err && err.code) || null;

  const getError = (error: Error): Response => {
    logger.error(error);
    return res.status(error.statusCode).json(error.toJSON());
  };

  if (code === 500) {
    const error: Error = new InternalError(err.message);
    getError(error);
  }
  const error: Error = new BaseError(err.message, code);
  getError(error);
};

export default errorHandler;
