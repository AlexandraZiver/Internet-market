import { Request, Response, NextFunction } from "express";
import logger from "./winston";
import errorCodes from "./errorCodes";
import { Interface } from "readline";

interface Error {
  statusCode: number;
  message: string;
}
interface Err {
  code: number;
}

interface errorHandler {
  (err: any, req: Request, res: Response, next: NextFunction): Response;
}

const errorHandler = (err, req, res, next): errorHandler => {
  const code: number = (err && err.code) || null;
  const error: Error = errorCodes[code] || errorCodes["INTERNAL_ERROR"];
  logger.error(err);
  return res.status(error.statusCode).json({ message: error.message });
};

export default errorHandler;
