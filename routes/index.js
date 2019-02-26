const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const generalRouter = require("./general");

router.use(loginRouter);
router.use(generalRouter);

module.exports = router;
