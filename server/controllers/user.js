/*******************************
File Name: survey.js
Description: It is the survey controller to do specific actions.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

/* Create reference to user model */
const User = require('../models/user');

/* Process Login */
module.exports.processLogin = (req, res, next)=>{

}

/* Process Register */
module.exports.processRegister = (req, res, next)=>{

}

// generate login & register
module.exports.login = (req, res, next)=>{res.render('login.ejs')}
module.exports.register = (req, res, next)=>{res.render('register.ejs')};