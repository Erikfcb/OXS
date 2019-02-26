const Admin = require("../models/Admin");

exports.tokenMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.sendStatus(401);
  } else {
    Admin.findOne({ token })
      .populate('tenants')
      .exec((err, admin) => {
      if (err) return res.sendStatus(500);
      if (!admin) return res.sendStatus(404);

      req.admin = admin;
      next();
    });
  }
};
