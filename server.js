const express = require("express");
// const bodyParser = require('body-parser')
const passport = require('passport');
const users = require('./routes/api/users');

const mongoose = require("mongoose");
const routes = require("./routes/index");
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

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/eventTracker").then(() => console.log('mongo connected')).catch(err => console.log(err));
app.use(passport.initialize())
require('./config/passport')(passport);
app.use("/api/users", users)

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
