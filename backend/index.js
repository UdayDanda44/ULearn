const connectToMongo = require('./db');
const user=require('./routes/auth')
const video=require('./routes/video')
const comments = require('./routes/comments')
connectToMongo();

var express = require('express');
var cors = require('cors')
const fs = require('fs')
var app = express()
 
app.use(cors()) 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
app.use(express.json()) 

app.use('/api/auth',user)

app.use('/api/auth',video)

app.use('/api/auth',comments)

const port = 5000; 



app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})