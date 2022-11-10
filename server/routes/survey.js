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
let controller = require('../controllers/survey');

/* POST for a survey list */
router.post('/list', controller.list);

/* POST for a survey */
router.post('/item', controller.item);
router.post('/item-without-answers', controller.itemWithoutAnswers);

/* POST for creating a survey */
router.post('/add', controller.add);

/* POST for editing a survey */
router.post('/update', controller.update);

/* POST for deleting a survey */
router.post('/delete', controller.delete);

/* POST for answer a survey */
router.post('/answer', controller.answer);

module.exports = router;