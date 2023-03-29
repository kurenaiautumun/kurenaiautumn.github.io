const express=require('express')
const router=express.Router()
const {date, User, Blog} = require('../models.js');


router.get("/blog",(req,res)=>{
    const _id = req.query.blogId;
      Blog.find({_id},(err,user)=>{
        res.status(201).json(user)
      })
  })

router.post("/blog",(req,res)=>{
    const _id = req.query.blogId;
      if(req.body.action == 'incrementViewCount'){
        Blog.updateOne(
          {_id},
          { $inc: { viewCount: 1 } },
          (err,docs)=>{
            if (err) throw err;
            res.status(201).json({message:"view increased"})
        })
      }
  })

router.post("/newblog",(req,res)=>{
const {userId, title, body, views, status, titleImage} = req.body;
const blog = new Blog({
    userId, title, body, views, status, date, titleImage
})
    blog.save((err,blog)=>{
        User.findOne({_id:userId},(err,user)=>{
            if (err) throw err;
            res.status(201).json({message:"blog saved", user, blog});
        }); 
    });
});

router.post("/updateBlog",(req,res)=>{
    let {id, title, body, titleImage} = req.body;
    Blog.updateOne({_id:id}, 
      {body, title, titleImage}, function (err, docs) {
        if (!err){
          res.status(201).json({message:"update succesfully",docs})
        }
      });
    });

router.post("/deleteBlog/:id",(req,res)=>{
    const _id = req.params.id;
    Blog.deleteOne({_id},(err,blog)=>{
        res.status(201).json({message:"blog deleted succesfully",blog})
    })
});

module.exports=router;