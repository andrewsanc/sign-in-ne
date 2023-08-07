const jwt = require("jsonwebtoken");
const CustomAPIError = require("./error-handler");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, email };
    next();
  } catch (err) {
    throw new CustomAPIError("Not autheroized to access this route", 401);
  }
};
module.exports = authenticationMiddleware;
