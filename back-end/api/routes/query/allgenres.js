const express = require('express')
const router = express.Router()

//query allgenres handler
const AllGenresController = require('../../controllers/query/allgenres.js')
router.get('/', AllGenresController.GetAllGenres)

module.exports = router