const express = require("express");
const router = express.Router();
const authMiddlware = require("../middleware/auth");

const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(authMiddlware, dashboard);
router.route("/login").post(login);

module.exports = router;
