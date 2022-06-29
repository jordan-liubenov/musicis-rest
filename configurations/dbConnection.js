const mongoose = require("mongoose");

require("dotenv/config");

const connectionString = process.env.db_string;

async function connectToDb() {
	await mongoose.connect(connectionString);
}

module.exports = connectToDb;
