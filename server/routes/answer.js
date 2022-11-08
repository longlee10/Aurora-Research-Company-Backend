/*******************************
File Name: answer.js
Description: It is the file to route answer requests to the right responses.
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
let controller = require('../controllers/answer');

/* POST for option count summary */
router.post('/option-count-summary', controller.optionCountSummary);

/* POST for option list summary */
router.post('/option-list-summary', controller.optionListSummary);

/* POST for creating an answer */
router.post('/add', controller.add);

module.exports = router;