import { InternalError, BaseError } from "../errors";
import logger from "../winston";

const getErrorByStatusCode = (statusCode: number, message: string): BaseError | InternalError => {
  switch (statusCode) {
    case 500:
      return new InternalError(message);
    default:
      return new BaseError(message, statusCode);
  }
};

const errorHandler = (err): BaseError => {
  const statusCode: number = (err && err.code) || 500;
  const message: string = (err && err.message) || "Something went wrong";

  const errorByStatusCode: BaseError | InternalError = getErrorByStatusCode(statusCode, message);

  logger.error(errorByStatusCode);

  return errorByStatusCode;
};

export default errorHandler;
