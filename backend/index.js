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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://ulearn-beta.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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