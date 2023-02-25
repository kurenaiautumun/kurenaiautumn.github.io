const express=require('express')
const router=express.Router()
const { User, Blog, Comment} = require('../models');


router.get("/",(req,res)=>{
    Blog.find({},(err,posts)=>{
      res.status(201).json(posts);
    })   
});

router.get("/dashboard/:userId",(req,res)=>{
    const userId = req.params.userId
    if(req.isAuthenticated()){
      User.find({_id:userId},(err,user)=>{
        Blog.find({userId},(err,blogs)=>{
          Comment.find({userId},(err,comments)=>{
            res.status(201).json({message:"dashboard",user,blogs,comments})
          })
        })
      })
    }else{
      res.status(201).json("user is not login");
    }
  });

module.exports=router;