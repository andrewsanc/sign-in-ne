/*
TODOS:
  Check username, password in post(login) request
    if exist create new JWT
    send back to the frontend
  
  Setup authentication so only the request with JWT can access the dashboard
*/
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors/index");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  // Demo purposes, ID normally provided by DB
  const id = new Date().getDate();

  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const { user } = req;

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(StatusCodes.OK).json({
    msg: `Hello, ${user.email}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
