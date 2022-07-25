const { login, getCurrentUserId } = require("../services/userService");
const settings = require("../configurations/settings");

const router = require("express").Router();

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const username = req.body.user;

    const foundUser = await getCurrentUserId(username);
    let id;
    if (foundUser) {
      id = foundUser._id;
    }

    const result = await login(req); //if successful, will return json web token
    if (!result) {
      res.send(result);
      return;
    }

    if (typeof result === "object") {
      if (result.usernameErr) {
        res.send({ error: result });
      } else if (result.passwordErr) {
        res.send({ error: result });
      }
      return;
    } else {
      jwt.verify(result, settings.secret, (err) => {
        if (err) return res.json({ error: err });
        res.json({ result, username, id });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
