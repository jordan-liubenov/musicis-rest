const { getCurrentUserId } = require("../services/userService");

const router = require("express").Router();

const jwt = require("jsonwebtoken");
const settings = require("../configurations/settings");
const {
  createNewOffer,
  fetchAllBySpecificUser,
  deleteEntry,
} = require("../services/postService");

//post new entry
router.post("/", async (req, res) => {
  let verified = false;
  const token = req.headers["x-auth-token"];

  jwt.verify(token, settings.secret, (err, decode) => {
    if (err) res.json({ error: err });
    if (decode) {
      verified = true;
      res.json({ success: decode });
    }
  });

  if (!verified) return;

  try {
    await createNewOffer(req);
  } catch (error) {
    console.log();
  }
});

//retrieve all entries by specific user
router.get("/", async (req, res) => {
  const headers = JSON.parse(req.headers["x-auth-token"]);

  const token = headers.token;
  const userId = headers.currentUserId;

  let verified = false;

  jwt.verify(token, settings.secret, (err, decode) => {
    if (err) res.json({ error: err });
    if (decode) {
      verified = true;
    }
  });
  if (!verified) return;

  const searchResults = await fetchAllBySpecificUser(userId);

  res.json(searchResults); //send the array full of documents from the current user
});

router.post("/delete", async (req, res) => {
  try {
    await deleteEntry(req);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
