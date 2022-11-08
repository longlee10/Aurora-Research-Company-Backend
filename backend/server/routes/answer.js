let express = require('express');
let router = express.Router();
let controller = require('../controllers/answer');

/* POST for option summary */
router.post('/option-summary', controller.optionSummary);

/* POST for creating an answer */
router.post('/add', controller.add);

module.exports = router;