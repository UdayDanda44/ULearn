const mongoose = require('mongoose')
const { Schema } = mongoose;

const Video = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  url:{
    type:String,
    required:true
  },
  teacher:{
    type:String,
    required:true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], 
  likesCount:{
    type:Number
  }
});

module.exports = mongoose.model('Video',Video)