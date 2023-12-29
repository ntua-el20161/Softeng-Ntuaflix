const express = require('express')
const router = express.Router()

//name query handler
const queryNameController = require('../../controllers/query/name')
router.get('/:nameID', queryNameController.GetName)

module.exports = router