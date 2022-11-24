/*******************************
File Name: user.js
Description: It is the user controller to do specific actions.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let User = require('../models/user');

/* Process Login */
module.exports.login = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      // server err?
      if(err)
      {
          return res.status(500).json(err);
      }
      // is there a user login error?
      if(!user)
      {
          return res.status(500).json({message: "Authentication Error"});
      }
      req.login(user, (err) => {
          // server error?
          if(err)
          {
              return res.status(500).json(err);
          }

          const payload = 
          {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email,
              contact_number: user.contact_number
          }

          const authToken = jwt.sign(payload, DB.Secret, {
              expiresIn: 604800 // 1 week
          });
          
          return res.json({success: true, message: 'User Logged in Successfully!', user: {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email,
              contact_number: user.contact_number
          }, token: authToken});

      });
  })(req, res, next);
}

/* Process Register */
module.exports.register = (req, res, next) => {
  if (req.body.password == undefined) {
    return res.status(500).json({success: false, message: 'Unable to find password!'}); 
  } 
  // instantiate a user object
  let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName,
      contact_number: req.body.contact_number
  });
  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
          if(err.name == "UserExistsError")
          {
            return res.status(500).json({success: false, message: 'User Already Exists!'});
          }
      }
      else
      {
        return res.json({success: true, msg: 'User Registered Successfully!'});
      }
  });
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.json({success: true, message: 'User Successfully Logged out!'});
}
