/*******************************
File Name: db.js
Description: This file defines database configuration and handles database initialization.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

function initializeDBConnection() {
  let mongoose = require("mongoose");

  //point mongoose to the DB URI
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let mongodb = mongoose.connection;
  mongodb.on("error", console.error.bind(console, "connection error:"));
  mongodb.once("open", () => {
    console.log("Database Connected");
  });
  
}

module.exports = {
    initializeDBConnection
};