const express = require('express')
const router = express.Router()

//qsearchtitle info handler
const infoSearchTitleController = require('../../controllers/info/qsearchtitle')
router.get('/', infoSearchTitleController.GetSearchTitle)

module.exports = router