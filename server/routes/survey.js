/*******************************
File Name: survey.js
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
let passport = require('passport');
let controller = require('../controllers/survey');

/* POST for a survey list */
router.post('/list', controller.list);

/* POST for a survey */
router.post('/item', passport.authenticate('jwt', {session: false}), controller.item);
router.post('/item-without-answers', controller.itemWithoutAnswers);

/* POST for creating a survey */
router.post('/add', passport.authenticate('jwt', {session: false}), controller.add);

/* POST for editing a survey */
router.post('/update', passport.authenticate('jwt', {session: false}), controller.update);

/* POST for deleting a survey */
router.post('/delete', passport.authenticate('jwt', {session: false}), controller.delete);

/* POST for answer a survey */
router.post('/answer', controller.answer);

module.exports = router;