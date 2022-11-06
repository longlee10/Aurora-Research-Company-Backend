var dbName = "group_project";
var username = "group_user";
var password = "group_user";
var fullUrl =
  "mongodb+srv://<username>:<password>@myfirstcluster.rwgrtyi.mongodb.net/<dbname>?retryWrites=true&w=majority";
//var connString = prefix+username+':'+password+'@'+dbUrl+dbName+postfix;
fullUrl = fullUrl
  .replace("<username>", username)
  .replace("<password>", password)
  .replace("<dbname>", dbName);

function initializeDBConnection() {
  let mongoose = require("mongoose");

  //point mongoose to the DB URI
  mongoose.connect(fullUrl, {
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