// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

require("./middleware")(app);
require("./routes")(app);

module.exports = app;
