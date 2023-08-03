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
  console.log(email, password);

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
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, Andrew`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
