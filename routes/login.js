const mongoose = require("mongoose");
const Admin = mongoose.model("admin");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const router = express.Router();

// Receives username and password, checks with database and returns user
router.post("/api/login", (req, res) => {
  Admin.findOne({ username: req.body.username }, (err, admin) => {
    if (err) return res.sendStatus(500);
    if (!admin) return res.sendStatus(404);

    bcrypt.compare(req.body.password, admin.password, (err, valid) => {
      if (err || !valid) return res.sendStatus(400);

      admin.token = crypto.randomBytes(60).toString("hex");
      admin.save((err, updatedUser) => {
        if (err) return res.sendStatus(500);

        console.log("Admin logged in at " + updatedUser.updatedAt);

        res.send(updatedUser);
      });
    });
  });
});

module.exports = router;
