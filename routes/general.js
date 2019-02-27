const mongoose = require("mongoose");
const Admin = mongoose.model("admin");
const Tenant = mongoose.model("tenant");
const path = require("path");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const crypto = require("crypto");
const db = require("../models");

router.use(auth.tokenMiddleware); // Check admins token, find admin and set it as req.admin

// Fetch tenants
// returns array of tenants
router.get("/api/tenants", (req, res) => {
  res.json(req.admin.tenants)
});

// Create new tenant
// Receives tenant's information. Creates new tenant and returns a new array of tenants with the new item
router.post("/api/create", async (req, res) => {
  try {
    const item = await Tenant.create(req.body);

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        $push: {
          tenants: item._id
        }
      }, {
        new: true
      }
    ).populate('tenants').exec();

    res.json(admin.tenants)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update tenant
// Receives tenant ID, name/debt/phone/adress to update and returns new array of tenants
router.put("/api/update", async (req, res) => {
  if (!req.body._id)
    return res.status(400).json({
      message: "Missing tenant id"
    });

  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.body._id,
      req.body, {
        new: true
      }).exec();

    const admin = await Admin.findById(req.admin._id)
      .populate('tenants')
      .exec()

    res.json(admin.tenants)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new tenant
// Receives tenant ID. Deletes tenant and returns a new array of tenants
router.delete("/api/delete", async (req, res) => {
  try {
    const { tenantId } = req.body;
    await Tenant.deleteOne({ _id: tenantId });

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        $pull: {
          tenants: tenantId
        }
      }, {
        new: true
      }
    ).populate('tenants').exec();

    res.json(admin.tenants);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
