const mongoose = require("mongoose");

let connectionString = process.env.db;

const connectToDb = () => {
	mongoose.connect(connectionString);
};

module.exports = connectToDb;
