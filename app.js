require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const projectName = "SaviCatch";

app.locals.appTitle = `${(projectName)} created with IronLauncher`;

const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth.routes");
app.use("/", auth);

const maps = require("./routes/maps.routes");
app.use("/maps", maps);


require("./error-handling")(app);

module.exports = app;
