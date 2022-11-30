/*******************************
File Name: user.js
Description: This file defines the user schema of the database.
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
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            require: true
        },
        contact_number: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true,
            unique: true 
        },
        displayName: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: 'user',
            require: true
        },
    } ,
    {
        collection: "users",
    });

// configure options for User Model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('users', UserSchema);
