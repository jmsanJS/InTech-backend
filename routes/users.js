var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["firstname", "lastname", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        canBookmark: true,
      });

      newUser.save().then((userData) => {
        res.json({ result: true, token: userData.token });
      });
    } else {
      res.json({ result: false, error: "This email is already registered" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((userData) => {
    if (userData && bcrypt.compareSync(req.body.password, userData.password)) {
      res.json({
        result: true,
        token: userData.token,
        firstname: userData.firstname,
        email: userData.email,
      });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

router.get("/can-bookmark/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      res.json({ result: true, canBookmark: data.canBookmark });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.delete("/delete-account", (req, res) => {
  console.log("body ===> ", req.body);
  User.findOne({ email: req.body.email, token: req.body.token }).then(
    (data) => {
      if (data && req.body.email === data.email && req.body.token === data.token) {
        User.deleteOne({ email: req.body.email, token: req.body.token }).then(() => {
          res.json({ result: true, message: "User account deleted" });
        });
      } else {
        res.json({ result: false, error: "An error has occurred. Please try again" });
      }
    }
  )
});

module.exports = router;
