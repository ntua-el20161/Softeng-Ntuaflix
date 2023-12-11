const express = require('express');
const multer = require('multer');
const db = require('../../../db');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const titleBasicsController = require('../../controllers/upload/titlebasics');
router.post('/titlebasics', upload.single('truncated_title.basics.tsv'), titleBasicsController.UploadTitleBasics); 

module.exports = router;
