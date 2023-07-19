const mongoose = require('mongoose');

const url = "mongodb+srv://trithvikprince:pandu200477@cluster0.uqzttsa.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async()=>{
    await mongoose.connect(url);
    console.log("connected to",url)
 
}

module.exports =  connectToMongo 