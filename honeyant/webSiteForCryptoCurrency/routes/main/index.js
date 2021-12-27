const express = require('express');
const router = express.Router();
const controller = require('./main.controller');
const apiCall = require('./apiCall');


router.post('/info', apiCall.coinInfo);
router.get('/', controller.mainCon);


module.exports = router;

