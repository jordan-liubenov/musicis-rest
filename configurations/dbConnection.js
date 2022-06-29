const mongoose = require("mongoose");

let connectionString = process.env.db;

async function connectToDb() {
	mongoose.connect(connectionString);
}

module.exports = connectToDb;
