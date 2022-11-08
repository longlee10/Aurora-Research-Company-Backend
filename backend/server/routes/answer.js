let express = require('express');
let router = express.Router();
let controller = require('../controllers/answer');

/* POST for option count summary */
router.post('/option-count-summary', controller.optionCountSummary);

/* POST for creating an answer */
router.post('/add', controller.add);

module.exports = router;