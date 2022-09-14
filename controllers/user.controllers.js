const userDb = require("../db/model/dbModel");

class User {
  static index = async (req, res) => {
    try {
      let result = await userDb.find();
      res.render("home", {
        pageTitle: "home page",
        result,
        noUsers: result.length === 0 ? true : false,
      });
    } catch (e) {
      res.send(e);
    }
  };

  static add = (req, res) => {
    res.render("add", {
      pageTitle: "add page",
    });
  };

  static getAddLogic = async (req, res) => {
    let user = new userDb(req.query);
    try {
      
      await user.save();
      res.redirect("/");
    } catch (e) {
      res.render("add", {
        pageTitle: "add page",
        user,
        errorMessage:e,
      });
    }
  };

  static delete = async (req, res) => {
    try {
      await userDb.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (e) {
      res.send(e.message);
    }
  };

  static toggle = async (req, res) => {
    try {
      const user = await userDb.findById(req.params.id);
      user.activeStatus = user.activeStatus ? "" : "on";
      await user.save();
      res.redirect("/");
    } catch (e) {
      res.send(e.message);
    }
  };

 
}

module.exports = User;