const router = require("express").Router();

const jwt = require("jsonwebtoken");
const settings = require("../configurations/settings");

// authorize user's token
router.post("/", async (req, res) => {
  const headers = JSON.parse(req.headers["x-auth-token"]);

  const token = headers.token;
  jwt.verify(token, settings.secret, (err, decode) => {
    if (err) res.json({ error: err });
    if (decode) res.json({ success: decode });
  });
});

module.exports = router;
