require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);
require('./config/session.config')(app)

const projectName = "SaviCatch";

app.locals.appTitle = `${(projectName)} created with IronLauncher`;

const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth.routes");
app.use("/", auth);

require("./error-handling")(app);

module.exports = app;
