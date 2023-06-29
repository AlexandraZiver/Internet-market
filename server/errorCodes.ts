const errorCodes = {
  INVALID_EMAIL_OR_PASSWORD: {
    statusCode: 400,
    message: "Invalid email address or password",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User not found",
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    message: "Internal Server Error",
  },
} as const;

type ErrorCode = keyof typeof errorCodes;
type ErrorData = (typeof errorCodes)[ErrorCode];

export default errorCodes;
