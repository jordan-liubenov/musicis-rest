const express = require("express");

const app = express();

const routes = require("./controllers/routes");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const cors = require("./middleware/cors");

require("dotenv").config();

const connectToDb = require("./configurations/dbConnection");

const settings = require("./configurations/settings");

const main = () => {
  try {
    connectToDb();
    app.listen(settings.port, () =>
      console.log(`<>>> Server is live on port ${settings.port} <<<>`)
    );
  } catch (error) {
    console.log(`!!! DB Error: ${error} !!!`);
  }

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(routes);

  app.use(cookieParser());
};
main();
