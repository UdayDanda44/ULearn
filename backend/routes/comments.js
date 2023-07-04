const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')

router.post('/uploadcomment',async(req,res)=>{
    try {
        const body = req.body
        const comment = await Comment.create(body)
        return res.status(200).send(comment)
    } catch (error) {
        return res.status(400).send({error,message:'Some error occured'})
    }
})
router.get('/getcomments',async(req,res)=>{
    try {
        const comments = await Comment.find().populate('user_id')
        return res.status(200).send(comments)
    } catch (error) {
        return res.status(400).send(error)
    }
   }) 

module.exports = router