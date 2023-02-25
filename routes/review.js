const express=require('express')
const router=express.Router()
const { Review} = require('../models.js');



router.get("/review/:blogId",(req,res)=>{
    const blogId = req.params.blogId;
    Review.find({blogId},(err,review)=>{
      res.status(201).json({message:"review details",blogId, review})
    })
  })

  router.post("/newReview",(req,res)=>{
    const {userId, blogId, body, score} = req.body;
    const review = new Review({ 
      userId, blogId, body, score, date 
    })
    review.save();
    res.status(201).json({message:"review is saved",review})
  })



  module.exports=router;
  