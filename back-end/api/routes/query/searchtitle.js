const express = require('express')
const router = express.Router()

//querysearchtitle info handler
const infoSearchTitleController = require('../../controllers/query/searchtitle')
router.get('/', infoSearchTitleController.GetSearchTitle)

module.exports = router