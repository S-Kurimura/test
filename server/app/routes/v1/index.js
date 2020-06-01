var express = require('express');
var router = express.Router();

//router.use('/article', require('./article.js'));
router.use('/test', require('./test.js'));

module.exports = router;