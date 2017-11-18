var db = require("../models");

module.exports = function(app) {

 //Route for retrieving a single user
  app.post("/api/verify", function(req, res) {
    console.log(req.body.username);
    console.log(req.body);
    db.User.findOne({
      where: {
        //id: req.body.username,
        name: req.body.username,
        password: req.body.password
      },
      include: [db.Child]
    }).then(function(dbUser) {
      console.log(dbUser);
      if (dbUser !== null) {
        var userObject = {
          username: dbUser.dataValues.name,
          children: dbUser.Children,
          userId: dbUser.dataValues.id
          };
          userObject.children.forEach(function(child) {
              console.log(child.dataValues)
          });
        console.log(userObject);
      res.render("userhome", userObject);
      }
      else{
        var hbsObject = {
          notFound: "User Not Found!"
        }
        console.log("user not found");
        res.redirect("/");
      }
    });
  });


  //Route for creating a new user
  app.post("/api/newuser", function(req, res) {

    var nameCheck = req.body.username;
    console.log(nameCheck);
    db.User.findOne({
      where: {
        name: req.body.username,
      }
    }).then(function(dbUser) {
      if (dbUser != null){
        res.redirect("/signup");
      }
      

        db.User.create({name: req.body.username,
        password: req.body.password}).then(function(dbUser) {
        res.redirect("/");
      
    });
    
    });


  });

  //Route for deleting a user... if needed
  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) { //May need this data to determine success
      res.json(dbUser);
    });
  });
};