// dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// port
var PORT = process.env.PORT || 3000;

// Express app
var app = express();

// Express router
var router = express.Router();
require("./config/routes")(router);

// public folder
app.use(express.static(__dirname + "/public"));

// Handlebars to the Express app
app.engine("handlebars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// BodyParser 
app.use(bodyParser.urlencoded({
	extended: false
}));

// requests 
app.use(router);


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// listen
app.listen(PORT, function() {
	console.log("Listening on port: " + PORT);
});