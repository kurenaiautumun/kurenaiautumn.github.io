const express=require('express')
const router=express.Router()
const {Blog, toggle} = require('../models.js');


router.get("/like/:blogId/:userId",(req,res)=>{
    const { blogId, userId } = req.params;
    Blog.findOne({_id:blogId},(err,blog)=>{
      let like = false;
      blog.likes.forEach(element => {
        if(element == userId) like=true;
      });
      res.status(201).json({like})
    })
  })
  
  router.post("/like/:blogId/:userId",(req,res)=>{
    const { blogId, userId } = req.params;
    Blog.findOne({_id:blogId},(err,blog)=>{
      toggle(blog.likes,userId)
        Blog.updateOne({_id:blogId},{
          likes:blog.likes
        },(err,docs)=>{
          if (err) throw err;
          res.json({message:"updated like",blog,docs})
        })
    })
  })


module.exports=router;
