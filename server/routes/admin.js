/*******************************
File Name: admin.js
Description: It is the file to route survey requests to the right responses.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

let express = require('express');
let router = express.Router();
let controller = require('../controllers/admin');
let passport = require('passport');

router.get('/user-list', passport.authenticate('jwt', {session: false}), controller.listUser);

// Delete User
router.delete('/delete-user/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);

// Get User
router.get('/user-profile/:id', passport.authenticate('jwt', {session: false}), controller.getUser);

// Update User
router.post('/edit-user/:id', passport.authenticate('jwt', {session: false}), controller.editUser);

// Update User's status
router.post('/update-user-status/:id', passport.authenticate('jwt', {session: false}), controller.updateUserStatus);

// Get Survey list for admin page
router.get('/survey-list', passport.authenticate('jwt', {session: false}), controller.listSurvey);

// Update Survey's status
router.post('/update-survey-status/:id', passport.authenticate('jwt', {session: false}), controller.updateSurveyStatus);

// Update Surveys' status
router.post('/update-surveys-status/:author', passport.authenticate('jwt', {session: false}), controller.updateSurveysStatus);

module.exports = router;