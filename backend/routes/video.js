const express = require('express');
const { uploadVideo, getVideo } = require('../controllers/videoController');
const router = express.Router();
router.post('/uploadvideo',uploadVideo)
router.get('/getvideo',getVideo)

module.exports = router 