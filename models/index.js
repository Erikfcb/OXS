const mongoose = require("mongoose");
const Admin = require("./Admin");
const Tenant = require("./Tenant");
const keys = require("../config/keys");

mongoose.set("debug", true);
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
});

exports.Admin = Admin;
exports.Tenant = Tenant;

