require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require('./config/session.config')(app)

const projectName = "SaviCatch";

app.locals.appTitle = `${(projectName)} created with IronLauncher`;

app.use("/", require("./routes/base.routes"))

require("./error-handling")(app);

module.exports = app;
