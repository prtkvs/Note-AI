const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { constants } = require("../errorConstants");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Authorization token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(constants.UNAUTHORIZED);
    throw new Error("Token is invalid or expired");
  }
});

module.exports = validateTokenHandler;
