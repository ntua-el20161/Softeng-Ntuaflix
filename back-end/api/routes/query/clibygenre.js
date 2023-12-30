const express = require('express')
const router = express.Router()

//cliquerybygenre info handler
const infoByGenreController = require('../../controllers/query/clibygenre.js')
router.get('/', infoByGenreController.GetTitleByGenre)

module.exports = router