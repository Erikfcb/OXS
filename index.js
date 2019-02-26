const express = require("express");
const bodyParser = require("body-parser");
require("./models");
const appRouter = require("./routes");
const config = require('./config/keys');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Mounting api router
app.use(appRouter);

app.listen(config.port, () => {
  console.log("server is running on port " + config.port);
});
