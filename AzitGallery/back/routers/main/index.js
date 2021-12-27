const express = require('express')
const router = express.Router()
const controller = require('./main.controller')

router.get('/', controller.insert)
router.post('/insertdata', controller.insert_data)
router.get('/main', controller.main)
router.post('/maindata', controller.main_data)
router.post('/auction', controller.auction)
router.post('/sendnoti', controller.sendNoti)

module.exports = router