const { getCurrentUserId } = require("../services/userService");

const router = require("express").Router();

const jwt = require("jsonwebtoken");
const settings = require("../configurations/settings");
const { createNewOffer } = require("../services/postService");

//post new entry
router.post("/", async (req, res) => {
  const token = req.headers["x-auth-token"];
  jwt.verify(token, settings.secret, (err, decode) => {
    if (err) res.json({ error: err });
    if (decode) res.json({ success: decode });
  });
  await createNewOffer(req);
});

module.exports = router;
