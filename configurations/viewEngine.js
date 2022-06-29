//Used for importing and setting handlebars as the current view engine

const handlebars = require("express-handlebars");

function setViewEngine(app) {
    app.engine("hbs", handlebars.engine({ 
        extname: "hbs" //set to use files with extension name to .hbs
    }));

    app.set("view engine", "hbs");
    app.set("views", "views"); //the second parameter is the path to the *views* folder
}

module.exports = setViewEngine;