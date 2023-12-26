const express = require('express')
const router = express.Router()

//searchname info handler
const infoSearchNameController = require('../../controllers/info/searchname')
router.get('/', infoSearchNameController.GetSearchName)

module.exports = router