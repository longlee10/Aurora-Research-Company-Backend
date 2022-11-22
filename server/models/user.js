/*******************************
File Name: survey.js
Description: This file defines the survey schema of the database.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        email: String,
        contact_number: String,
        username: String,
        password: String,
        displayName: String
    } ,
    {
        collection: "users",
    });


module.exports = mongoose.model('users', UserSchema);
