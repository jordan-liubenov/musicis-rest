const express = require("express");

const app = express();

require("dotenv").config();

const connectToDb = require("./configurations/dbConnection");

const settings = require("./configurations/settings");

const main = async () => {
	try {
		await connectToDb();
		app.listen(settings.port, () =>
			console.log(`Server is live on port ${settings.port}`)
		);
	} catch (error) {
		console.log(`DB Error: ${error}`);
	}
};
main();
