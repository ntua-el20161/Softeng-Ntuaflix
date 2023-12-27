const express = require('express')
const router = express.Router()

//querysearchname info handler
const infoSearchNameController = require('../../controllers/query/searchname')
router.get('/', infoSearchNameController.GetSearchName)

module.exports = router