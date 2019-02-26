const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const bcrypt = require("bcrypt-nodejs");

const AdminSchema = new Schema({
  token: String,
  username: String,
  password: String,
  tenants: [{
    type: Schema.ObjectId,
    ref: 'tenant'
  }]
}, {
  timestamps: true
});

AdminSchema.pre("save", function(next) {
  const admin = this;
  if (!admin.isModified("password")) return next();

  bcrypt.hash(admin.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }

    admin.password = hash;
    next();
  });
});

const Admin = mongoose.model("admin", AdminSchema);

// const token = crypto.randomBytes(60).toString("hex");
// Admin.create(
//   {
//     username: "admin",
//     password: 123,
//     token: "",
//     tenants: []
//   },
//   (err, item) => {
//     if (err) console.log("Something went wrong : " + err);
//     else {
//       console.log(item);
//     }
//   }
// );

module.exports = Admin;
