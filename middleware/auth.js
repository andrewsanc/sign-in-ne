const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
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
