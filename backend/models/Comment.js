const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }, 
    video_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now()
    }
  });

module.exports = mongoose.model('comment',commentSchema)