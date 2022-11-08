let express = require('express');
let router = express.Router();
let controller = require('../controllers/survey');

/* GET for a survey list */
router.post('/list', controller.list);

/* POST for creating a survey */
router.post('/add', controller.add);

/* POST for editing a survey */
router.post('/update', controller.update);

/* POST for deleting a survey */
router.post('/delete', controller.delete);

module.exports = router;