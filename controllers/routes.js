const express = require("express");

const router = express.Router();

const authController = require("./authController");
const homeController = require("./homeController");
const registerController = require("./registerController");
const loginController = require("./loginController");
const postController = require("./postController");

router.use("/auth", authController);
router.use("/", homeController);
router.use("/register", registerController);
router.use("/login", loginController);
router.use("/post", postController);

module.exports = router;
