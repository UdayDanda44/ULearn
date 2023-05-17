const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1";

const connectToMongo = async()=>{
    await mongoose.connect(url);
    console.log("connected to",url)
 
}

module.exports =  connectToMongo 