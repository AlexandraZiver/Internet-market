export class BaseError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export class InternalError extends BaseError {
  public originalError: Error;
  public statusCode: number;

  constructor(message?: string) {
    super(message || "Internal Server Error", 500);
  }

  public toJSON() {
    return {
      name: this.constructor.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
