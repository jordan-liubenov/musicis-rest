const { fetchAllEntries, fetchEntryById } = require("../services/postService");

const router = require("express").Router();

router.get("/all", async (req, res) => {
  //used for requests which fetch all the entries in the db
  try {
    let retrievedData = await fetchAllEntries();
    res.json({ dataArr: retrievedData });
  } catch (error) {
    console.log(error);
  }
});

router.post("/specific", async (req, res) => {
  const entryId = req.body.id;
  try {
    const result = await fetchEntryById(entryId);
    res.json({ entry: result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
