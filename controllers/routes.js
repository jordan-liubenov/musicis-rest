const express = require("express");

const router = express.Router();

const homeController = require("./homeController");

router.use("/", homeController);

module.exports = router;
