const express = require('express')
const router = express.Router()

//searchtitle info handler
const infoSearchTitleController = require('../../controllers/info/searchtitle')
router.get('/', infoSearchTitleController.GetSearchTitle)

module.exports = router