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

// create the User Model instance
let User = require('../models/user');

/* Process Login */
module.exports.login = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      if(err) {
        return res.status(500).json(err);
      } else if(!user) {
        return res.status(500).json({message: "Incorrect username or password."});
      }
      req.login(user, {session: false}, (err) => {
          if(err) {
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

          const authToken = jwt.sign(payload, process.env.JWT_KEY, {
              expiresIn: 604800 // 1 week
          });
          
          return res.status(200).json({ user: {
              _id: user._id,
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
  // Force to set the role as the normal user
  req.body.role = "user";
  User.register(req.body, req.body.password, err => {
    console.log(err);
      if(err && err.name == "UserExistsError") {
        return res.status(500).json({message: "The username is already existed."});
      } else if (err && err.code == 11000) {
        // Assume that only email and username are unique.
        return res.status(500).json({message: "The email is already existed."});
      } else if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json({});
      }
  });
}

/* Process logout */
module.exports.logout = (req, res, next) => {
  // Nothing to do now. 
}

/* Display Edit User */
module.exports.displayEditUser = (req, res, next)=>{
  let id = req.params.id;

  User.findById(id, (err, userToEdit)=>{
    if(err){
      res.end(err);
    }
    else{
      res.status(200).json({success: true, user: userToEdit});
    }
  })
}


/* Process Editting User*/
module.exports.editUser = (req, res, next)=>{
  User.findByIdAndUpdate(req.body._id, {
      email: req.body.email,
      contact_number: req.body.contact_number,
      displayName: req.body.displayName,
  },  {new: true}, (err, user) => {
      if (err) {
          res.status(500).json(err);
      } else {
          res.status(200).json({ user: {
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            contact_number: user.contact_number
        }});
      }
  });
}

/* Edit Password */
module.exports.editPassword = (req, res, next) => {
  User.findOne({_id: req.body._id}, (err, user) => {
    if(err){
      res.status(500).json(err);
    }else {
      user.setPassword(req.body.password,(err, user) => {
        if (err) {
          res.status(500).json(err);
        } else {
          user.save();
          return res.status(200).json({});
        }
      });
    }
  });
}
