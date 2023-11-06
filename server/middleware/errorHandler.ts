import { Request, Response } from "express";

import { InternalError, BaseError } from "../services/errors";
import logger from "../services/winston";

const getErrorByStatusCode = (statusCode: number, message: string): BaseError | InternalError => {
  switch (statusCode) {
    case 500:
      return new InternalError(message);
    default:
      return new BaseError(message, statusCode);
  }
};

const errorHandler = (err, req: Request, res: Response): Response | BaseError => {
  const statusCode: number = (err && err.code) || 500;
  const message: string = (err && err.message) || "Something went wrong";

  const errorByStatusCode: BaseError | InternalError = getErrorByStatusCode(statusCode, message);

  logger.error(errorByStatusCode);

  return res.status(statusCode).json({ message: errorByStatusCode.message });
};

export default errorHandler;
