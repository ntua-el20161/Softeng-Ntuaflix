const express = require('express')
const router = express.Router()

//resetALl handler
const resetAllController = require('../../controllers/reset/resetall')
router.post('/', resetAllController.ResetAll)

module.exports = router