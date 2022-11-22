let express = require('express');
let router = express.Router();
let controller = require('../controllers/user');

router.get('/loggin', controller.login);

module.exports = router;