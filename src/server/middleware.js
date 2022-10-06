// Require Express to run server and routes
const express = require("express");

// Cors for cross origin allowance
const cors = require("cors");

module.exports = (app) => {
  // Parse application/json
  app.use(express.json());

  app.use(cors());

  // Initialize the main project folder
  app.use(express.static("dist"));
};
