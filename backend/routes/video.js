const express = require('express');
const { uploadVideo, getVideo } = require('../controllers/videoController');

const fetchUser = require('../middleware/fetchUser')
const Video = require('../models/Video');
const User = require('../models/User');
const router = express.Router();
router.post('/uploadvideo',uploadVideo)
router.get('/getvideo',getVideo)
router.post("/likevideo/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const { user_id } = req.body;
        console.log(user_id);
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      // Check if the user has already liked the video
      if (video.likes.includes(user_id)) {
        return res.status(400).json({ message: "User already liked the video" });
      }
  
      video.likes.push(user_id);
      video.likesCount++;
      console.log(video.likesCount);
      await video.save();
  
      res.status(200).json(video);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  router.post("/unlikevideo/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const { user_id } = req.body;
  
      let video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      // Check if the user has already unliked the video
      if (!video.likes.includes(user_id)) {
        return res.status(400).json({ message: "User has not liked the video" });
      }
  
    //   const index = video.likes.indexOf(user_id);
    //   video.likes.splice(index, 1);
      video.likes = video.likes.filter((v)=> v !== user_id);
      console.log(video);
      video.likesCount--;
      await video.save();
  
      res.status(200).json(video);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  
  
module.exports = router 