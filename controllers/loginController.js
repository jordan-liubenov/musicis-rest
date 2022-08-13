const { login, getCurrentUserId } = require("../services/userService");
const settings = require("../configurations/settings");

const router = require("express").Router();

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const username = req.body.user;

    const foundUser = await getCurrentUserId(username);
    let id;
    let email;
    if (foundUser) {
      id = foundUser._id;
      email = foundUser.email;
    }

    const result = await login(req); //if successful, will return json web token
    if (!result) {
      res.json(result);
      return;
    }

    if (typeof result === "object") {
      if (result.usernameErr) {
        res.json({ error: result });
      } else if (result.passwordErr) {
        res.json({ error: result });
      }
      return;
    } else {
      //upon success, send token and user data 
      jwt.verify(result, settings.secret, (err) => {
        if (err) return res.json({ error: err });
        res.json({ result, username, id, email });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
