// This is exactly the point where people either keep copy-pasting try/catch everywhere or step up and structure the backend properly.
// you have multiple controllers ; you’re repeating the same try/catch + res.status(500) logic everywhere
// instead, create a centralized error handling middleware that catches errors from all controllers
// and keeps your controller code clean.

// To achieve this, we can use a package like express-async-handler
// therefore we use asyncHandler to wrap each controller function because it automatically catches any error thrown inside the async function and passes it to the next middleware (which is our error handler). - Interview Question explanation


const { constants } = require("../constants");
const dotenv = require("dotenv").config(); // directly

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : constants.SERVER_ERROR;

  res.status(statusCode);

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }), // because in development we want to see stack trace for debugging but not in production(ignores) and ... is used for spread operator to add stackTrace if in development. Important because stack trace can expose file paths and sensitive info.
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }),
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }),
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }),
      });
      break;

    case constants.CONFLICT:
      res.json({
        title: "Conflict",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }),
      });
      break;

    case constants.TOO_MANY_REQUESTS:
      res.json({
        title: "Too Many Requests",
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }),
      });
      break;

    case constants.SERVER_ERROR:
    default:
      res.json({
        title: "Server Error",
        message: err.message || "Something went wrong",
        ...(process.env.NODE_ENV === "development" && {
          stackTrace: err.stack,
        }),
      });
      break;
  }
};

module.exports = errorHandler;
