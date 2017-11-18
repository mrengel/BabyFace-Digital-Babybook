var db = require("../models");

module.exports = function(app) {


  //Get route for retrieving a single child.. Will prolly not need in production
  app.get("/api/child/:id", function(req, res) {
    db.Child.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  //Route for retieving all children from a user
  app.get("/api/child", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Child.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });


  // Post route for creating a new child
  app.post("/api/child", function(req, res) {
    console.log(req.body);
    db.Child.create({name: req.body.name,
        dob: req.body.dob, 
        UserId: req.body.userId
      }).then(function(newChild) {
        var query = {};
      if (req.body.userId) {
          query.UserId = req.body.userId;
      }
        db.Child.findAll({
        where: query,
        include: [db.User]
      }).then(function(children) {
          var userHomeObject = {
          username: req.body.userName,
          children: children,
          userId: req.body.userId
      };
        console.log(userHomeObject);
        res.render("userhome", userHomeObject);
      });
    });
  });

  //Delete route for removing a child... if needed
  app.delete("/api/child/:id", function(req, res) {
    db.Child.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbChild) { //May need this data to determine success
      res.json(dbChild);
    });
  });
};