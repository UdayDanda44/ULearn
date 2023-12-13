const mongoose = require("mongoose");

const url =
  "mongodb+srv://udaydanda44:ut7VQGae70rxgCwt@cluster0.bupssbe.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
  await mongoose.connect(url);
  console.log("connected to", url);
};

module.exports = connectToMongo;
