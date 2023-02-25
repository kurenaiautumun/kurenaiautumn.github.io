const express=require('express')
const router=express.Router()
const {Like, toggle} = require('../models.js');


router.get("/like/:blogId/:userId",(req,res)=>{
    const { blogId, userId } = req.params;
    Like.findOne({blogId},(err,blog)=>{
      let like = false;
      const totalLikes = blog.likes; 
      for (let Key in totalLikes) {
        if (totalLikes[Key] === userId) {
          like = true
          break; 
        }
      }
      res.status(201).json({like})
    })
  })
  
  router.post("/like/:blogId/:userId",(req,res)=>{
    const { blogId, userId } = req.params;
    Like.findOne({blogId},(err,blog)=>{
      toggle(blog.likes,userId)     
        Like.updateOne({blogId},{
          likes:blog.likes
        },(err,docs)=>{
          if (err) throw err;
          res.json({message:"updated like",docs})
        })
    })
  })



module.exports=router;
