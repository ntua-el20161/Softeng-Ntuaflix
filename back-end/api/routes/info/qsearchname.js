const express = require('express')
const router = express.Router()

//querysearchname info handler
const infoSearchNameController = require('../../controllers/info/qsearchname')
router.get('/', infoSearchNameController.GetSearchName)

module.exports = router