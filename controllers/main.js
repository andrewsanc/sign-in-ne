/*
TODOS:
  Check username, password in post(login) request
    if exist create new JWT
    send back to the frontend
  
  Setup authentication so only the request with JWT can access the dashboard
*/

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  res.send("Fake Login/Register/Signup Route");
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
