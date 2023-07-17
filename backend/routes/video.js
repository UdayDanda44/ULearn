const express = require("express");
const { uploadVideo, getVideo } = require("../controllers/videoController");
const ErrorHandler=require('../utils/errorHandler')

const fetchUser = require("../middleware/fetchUser");
const Video = require("../models/Video");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const { log } = require("console");

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

cloudinary.config({
  cloud_name: "dtrrxvumj",
  api_key: "453121125234534",
  api_secret: "36u5txt5yOwRmcmBZcVdTDi718I",
});

router.post("/uploadvideo", upload.single("video"), (req, res) => {
  try {
    const { title, description, teacher } = req.body;
  const video = req.file;
  cloudinary.uploader.upload(
    video.path,
    { resource_type: "video" },
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      const newVideo = new Video({
        title: title,
        description: description,
        teacher: teacher,
        url: result.url,
        cloudinaryId: result.public_id,
      });
      const savedVideo = await newVideo.save();
      return res.status(200).send({ savedVideo, sucssess: true });
    }
  );
  } catch (error) {
    return next(new ErrorHandler(error, 404))
  }
  
});

router.get("/getvideo", getVideo);
router.post("/likevideo/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { user_id } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the user has already liked the video
    if (video.likes.includes(user_id)) {
      return res.status(500).json({ message: "User already liked the video" });
    }

    video.likes.push(user_id);
    video.likesCount++;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.post("/unlikevideo/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { user_id } = req.body;

    const userIDObject = new mongoose.Types.ObjectId(user_id);
    let video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the user has already unliked the video
    if (!video.likes.includes(user_id)) {
      return res.status(500).json({ message: "User has not liked the video" });
    }

    //   const index = video.likes.indexOf(user_id);
    //   video.likes.splice(index, 1);

    const updatedLikes = video.likes.filter(
      (like) => !like.equals(userIDObject)
    );
    video.likes = updatedLikes;
    video.likesCount--;
    await video.save();

    return res.status(200).json(video);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});
router.get("/getvideos/:teacher", async (req, res) => {
  try {
    const teacher = req.params;
    const videos = await Video.find(teacher);
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(200).json({error:error.message,messgae:"Some error occured"});
  }
});
router.delete("/deletevideo/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const id = new mongoose.Types.ObjectId(userId);
    const deletedVideo = await Video.findByIdAndRemove(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({ message: "Video successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
