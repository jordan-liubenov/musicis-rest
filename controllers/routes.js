const express = require("express");

const router = express.Router();

const authController = require("./authController");
const fetchDataController = require("./fetchController");

const registerController = require("./registerController");
const loginController = require("./loginController");
const postController = require("./postController");

const ratingController = require("./ratingController");

router.use("/auth", authController);
router.use("/fetch", fetchDataController);

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/post", postController);

router.use("/rate", ratingController);

module.exports = router;
