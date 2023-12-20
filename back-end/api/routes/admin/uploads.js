const express = require('express');
const multer = require('multer');
const db = require('../../../db');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//titlebasics upload handler
const titleBasicsController = require('../../controllers/upload/titlebasics');
router.post('/titlebasics', upload.single('truncated_title.basics.tsv'), titleBasicsController.UploadTitleBasics); 

//titleakas upload handler
const titleAkasController = require('../../controllers/upload/titleakas');
router.post('/titleakas', upload.single('truncated_title.akas.tsv'), titleAkasController.UploadTitleAkas);

//namebasics upload handler
const nameBasicsController = require('../../controllers/upload/namebasics');
router.post('/namebasics', upload.single('truncated_name.basics.tsv'), nameBasicsController.UploadNameBasics);

//titlecrew upload handler
const titleCrewController = require('../../controllers/upload/titlecrew');
router.post('/titlecrew', upload.single('truncated_title.crew.tsv'), titleCrewController.UploadTitleCrew);

//titleepisode upload handler
const titleEpisodeController = require('../../controllers/upload/titleepisode');
router.post('/titleepisode', upload.single('truncated_title.episode.tsv'), titleEpisodeController.UploadTitleEpisode);

//titleprincipals upload handler
const titlePrincipalsController = require('../../controllers/upload/titleprincipals');
router.post('/titleprincipals', upload.single('truncated_title.principals.tsv'), titlePrincipalsController.UploadTitlePrincipals);

//titleprincipals upload handler
const titleRatingsController = require('../../controllers/upload/titleratings');
router.post('/titleratings', upload.single('truncated_title.ratings.tsv'), titleRatingsController.UploadTitleRatings);

module.exports = router;