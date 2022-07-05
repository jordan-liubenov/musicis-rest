const express = require("express");

const app = express();

const routes = require("./controllers/routes");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const cors = require("cors");

require("dotenv").config();

const connectToDb = require("./configurations/dbConnection");

const settings = require("./configurations/settings");

app.use(cors());

app.use(routes); //use the routes as middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const main = () => {
  try {
    connectToDb();
    app.listen(settings.port, () =>
      console.log(`Server is live on port ${settings.port}`)
    );
  } catch (error) {
    console.log(`DB Error: ${error}`);
  }
};
main();
