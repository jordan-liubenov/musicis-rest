const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Home request sent" });
});

module.exports = router;
