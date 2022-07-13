const express = require("express");

const router = express.Router();

const homeController = require("./homeController");
const registerController = require("./registerController");
const loginController = require("./loginController");

router.use("/", homeController);
router.use("/register", registerController);
router.use("/login", loginController);

module.exports = router;
