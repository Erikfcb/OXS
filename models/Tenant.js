const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
  name: String,
  debt: Number,
  phone: String,
  adress: String
});

const Tenant = mongoose.model("tenant", TenantSchema);

module.exports = Tenant;
