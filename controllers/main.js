/*
TODOS:
  Check username, password in post(login) request
    if exist create new JWT
    send back to the frontend
  
  Setup authentication so only the request with JWT can access the dashboard
*/
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  // Demo purposes, ID normally provided by DB
  const id = new Date().getDate();

  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.email}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    throw new CustomAPIError("Not autheroized to access this route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
