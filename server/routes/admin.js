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

router.route('/user-list').get(controller.listUser);

// Delete User
router.route('/delete-user/:id').delete(controller.deleteUser);

// Get User
router.route('/user-profile/:id').get(controller.getUser);

// Update User
router.route('/edit-user/:id').post(controller.editUser);

// Update User's status
router.route('/update-user-status/:id').post(controller.updateUserStatus);

// Get Survey list for admin page
router.route('/survey-list').get(controller.listSurvey);

// Update Survey's status
router.route('/update-survey-status/:id').post(controller.updateSurveyStatus);

// Update Surveys' status
router.route('/update-surveys-status/:author').post(controller.updateSurveysStatus);

module.exports = router;