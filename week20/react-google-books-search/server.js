const express = require("express");

const mongoose = require("mongoose");
const routes = require("./server/routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// If deployed, use the deployed DB, otherwise use the local dbScrape DB
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://cll:lleVON001@ds263927.mlab.com:63927/heroku_h917fw99";
mongoose.set("useUnifiedTopology", true);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(error) {
  if (error) {
    throw error;
  }
  console.log("Successful connection to mongoDB!");
});

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
