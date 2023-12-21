const express = require('express')
const router = express.Router()

//title info handler
const infoTitleController = require('../../controllers/info/title')
router.get('/:titleID', infoTitleController.GetTitleInfo)

module.exports = router