const express = require("express");

const router = express.Router();

const homeController = require("./homeController");
const registerController = require("./registerController");

router.use("/", homeController);
router.use("/register", registerController);

module.exports = router;
