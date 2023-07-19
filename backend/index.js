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

app.all('/api/*', async (req, res) => {
    try {
      const url = `https://minip-seven.vercel.app${req.url}`;
      const method = req.method.toLowerCase();
      const headers = req.headers;
      const data = req.body;
  
      const response = await axios({
        method,
        url,
        headers,
        data,
      });
  
      // Forward the response from the target server to the client
      res.status(response.status).json(response.data);
    } catch (error) {
      // Handle errors
      res.status(error.response.status || 500).json({ error: error.message });
    }
  });
 
app.use(express.json()) 

app.use('/api/auth',user)

app.use('/api/auth',video)

app.use('/api/auth',comments)

const port = 5000; 



app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})