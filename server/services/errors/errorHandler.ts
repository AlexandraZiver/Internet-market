import { InternalError, BaseError } from ".";
import logger from "../winston";

const getErrorByStatusCode = (statusCode: number, message: string): BaseError | InternalError => {
  switch (statusCode) {
    case 500:
      return new InternalError(message);
    default:
      return new BaseError(message, statusCode);
  }
};

const errorHandler = (err, res) => {
  const statusCode: number = (err && err.code) || 500;
  const message: string = (err && err.message) || "Something went wrong";

  const errorByStatusCode: BaseError | InternalError = getErrorByStatusCode(statusCode, message);

  logger.error(errorByStatusCode);

  return res.status(statusCode).json({ error: errorByStatusCode.message });
};

export default errorHandler;
