var db = require("../models");
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;



module.exports = function(app) {
	app.get("/", function(req, res) {
	  // send us to the next get function instead.
	  res.redirect("/home");
	});

	app.get("/home", function(req, res){
		return res.render("index");
	})

	app.get("/signup", function(req, res){
		return res.render("signup");
	})

	app.get("/homepage", function(req, res){
		return res.render("userhome")
	})



	app.post("/login", 
		passport.authenticate('local'), function(req, res) { 
			//console.log(req);
			res.render('userhome');
		});


//app.get('/login', function(req, res, next) {
//  passport.authenticate('local', function(err, user, info) {
 //   if (err) { return next(err); }
 //   if (!user) { return res.redirect('/login'); }
   // req.logIn(user, function(err) {
  //    if (err) { return next(err); }
  //    return res.render('/homepage');
   // });
 // })(req, res, next);

 // res.render('userhome');

//});

};







//successRedirect: "/homepage",
//										failureRedirect: "/",
//										failureFlash: true

//		);
//	
