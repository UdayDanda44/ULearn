const Video = require("../models/Video");

exports.uploadVideo = async(req,res)=>{
    const {title,description,url,teacher} = req.body;
    const video = await Video.create({title,description,url,teacher})
    await video.save();
    return res.status(200).json({success:true,video});
}  

exports.getVideo = async(req,res)=>{
    try {
        const videos = await Video.find();
        return res.status(200).json({success:true,videos});
    } catch (error) {
        return res.status(200).json({success:false,error});
    }
    
}

