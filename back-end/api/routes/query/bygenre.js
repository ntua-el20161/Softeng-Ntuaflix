const express = require('express')
const router = express.Router()

//querybygenre info handler
const infoByGenreController = require('../../controllers/query/bygenre.js')
router.get('/', infoByGenreController.GetTitleByGenre)

module.exports = router