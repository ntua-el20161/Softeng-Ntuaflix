const express = require('express')
const router = express.Router()

//bygenre info handler
const infoByGenreController = require('../../controllers/info/bygenre.js')
router.get('/', infoByGenreController.GetTitleByGenre)

module.exports = router