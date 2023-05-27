const express = require("express");
const userModel = require("../models/UserModel");
const app = express();

//get all
app.get("/list", (req, res) => {
  userModel.find({}).then((users) => {
    res.render("users/listUs", {
      users: users.map((user) => user.toJSON()),
    });
  });
});

//delete user
app.get("/delete/:id", (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/users/list"))
    .catch((err) => {
      res.sendStatus(400).send("not found!");
    });
});

module.exports = app;
