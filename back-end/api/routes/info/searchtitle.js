const express = require('express')
const router = express.Router()

//searchtitle info handler
const SearchTitleController = require('../../controllers/info/searchtitle')
router.get('/', SearchTitleController.SearchTitle)

module.exports = router