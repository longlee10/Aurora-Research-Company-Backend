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

const express = require('express');
const router = express();
const authenticationControl = require('../controllers/user')

/* Sign Up request */
router.post('/register', authenticationControl.Register);

/* Sign In Request */
router.post('/login', authenticationControl.Login);

module.exports = router;