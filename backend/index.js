const connectToMongo = require('./db');

connectToMongo();

var express = require('express');
var cors = require('cors')  
const fs = require('fs')
var app = express()
 
app.use(cors())
 
app.use(express.json()) 


const port = 5000; 



app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})