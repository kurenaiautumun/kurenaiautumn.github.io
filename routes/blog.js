const express=require('express')
const router=express.Router()
const {date, User, Blog, Like} = require('../models.js');


router.get("/blog",(req,res)=>{
    const _id = req.query.blogId;
      Blog.find({_id},(err,user)=>{
        res.status(201).json(user)
      })
  })

router.post("/newBlog",(req,res)=>{
const {userId, title, body, views, status} = req.body;
const blog = new Blog({
    userId, title, body, views, status, date
})
    blog.save((err,blog)=>{
        const like = new Like({
        blogId : blog._id,
        likes: {"1":"sample"}
        })
        like.save(()=>{
        User.findOne({_id:userId},(err,user)=>{
            if (err) throw err;
            res.status(201).json({message:"blog saved", user, blog, like});
        });
        })
    });
});

router.post("/updateBlog",(req,res)=>{
    let {id, title, body} = req.body;
    Blog.updateOne({_id:id}, 
      {body,title}, function (err, docs) {
        if (!err){
          res.status(201).json({message:"update succesfully",docs})
        }
      });
    });

router.post("/deleteBlog/:id",(req,res)=>{
    const payload = req.params.id;
    Blog.deleteOne({_id:payload},(err,blog)=>{
        res.status(201).json({message:"blog deleted succesfully",blog})
    })
});


 //tests start
 router.get("/blog/:blogTitle",(req,res)=>{
    const title = req.params.blogTitle;
    Blog.find({title},(err,user)=>{
      res.status(201).json(user)
    })
  })
  
  router.post("/blog/:blogTitle",(req,res)=>{
    const blog = new Blog({
      userId: req.body.userId,
      title: req.params.blogTitle,
      body: req.body.body,
      views:req.body.views,
      status:req.body.status,
      date:date
    });
    blog.save();
    res.status(201).json({message:"blog saved",blog:blog});
  })

  //tests ends

module.exports=router;