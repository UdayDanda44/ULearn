const connectToMongo = require('./db');
const user=require('./routes/auth')
const video=require('./routes/video')
connectToMongo();

var express = require('express');
var cors = require('cors')
const fs = require('fs')
var app = express()
 
app.use(cors()) 
 
app.use(express.json()) 

app.use('/api/auth',user)

app.use('/api/auth',video)

const port = 5000; 



app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})