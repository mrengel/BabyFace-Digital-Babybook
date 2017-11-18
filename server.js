var http = require('http');
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var db = require("./models");
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

//Trying to reference all the routing files in the controller folder
//Then allow handlebars to be used in those files 
//var routes = require("./controllers");

var app = express();
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//app.use("/", routes); ??????

// Setting up Express middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(passport.initialize());

// Static directory
app.use(express.static("public"));



//routes
require("./routes/child-api.js")(app);
require("./routes/memory-api.js")(app);
require("./routes/user-api.js")(app);
require('./routes/passport.js')(passport, db.User);
require("./routes/default.js")(app);



// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});