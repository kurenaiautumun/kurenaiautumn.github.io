//jshint esversion:6
require('dotenv').config();
const express = require("express");
const app = express();
var cors = require('cors');
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const { User, Blog, Comment, Like, corsOptions } = require('./models.js');
const date = new Date().toLocaleDateString();

app.use(cors(corsOptions))
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret:process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOLAB_URI,{useNewUrlParser: true});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    Blog.find({},(err,posts)=>{
      res.status(201).status(201).json(posts);
    })   
});

app.get("/dashboard/:userid",(req,res)=>{
  const userId = req.params.userid
  if(req.isAuthenticated()){
    User.find({_id:userId},(err,user)=>{
      Blog.find({userId:userId},(err,blogs)=>{
        Comment.find({userId:userId},(err,comments)=>{
          res.status(201).json({message:"dashboard",user,blogs,comments})
        })
      })
    })
  }else{
    res.status(201).json("user is not login");
  }
});

app.get("/blog",(req,res)=>{
  const blogId = req.query.blogId;
    Blog.find({_id:blogId},(err,user)=>{
      res.status(201).json(user)
    })
})

app.get("/comment/:blogId",(req,res)=>{
  const blog = req.params.blogId;
  Comment.find({blogId:blog},(err,user)=>{
    res.status(201).json({message:"all comments of blog",user:user});
  })
})

app.post("/signup",function(req,res){
  User.register({username:req.body.username,email:req.body.email}, req.body.password,
    function(err,user){
    if(err){
      res.status(201).json({err:err});
    }else{
      passport.authenticate("local")(req,res,function(){
        res.status(201).json({message:"user signup successfully",user:user});
      })
    }
  })
});

app.post("/login",function(req,res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
   });
   req.login(user, function(err){
    if(!err){
        passport.authenticate("local")(req,res,function(){
          User.find({username:user.username},(err,user)=>{
            res.status(201).json({message:"user login successfully",user:user[0]});
          })
        })
    }else{
      res.status(404).json("username or password is wrong")
    }
   })
})

app.post("/newblog",(req,res)=>{
  const blog = new Blog({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
    views:req.body.views,
    status:req.body.status,
    date:date
  });
  blog.save((err,response)=>{
    User.find({_id:req.body.userId},(err,user)=>{
      res.status(201).json({message:"blog saved",user:user[0],blog:response});
    })
  });
});

app.post("/newComment",(req,res)=>{
  const comment = new Comment({
    userId:req.body.userId,
    blogId:req.body.blogId,
    body:req.body.body,
    status:req.body.status,
    date:date
  });
  comment.save(()=>{
    res.status(201).json({message:"comment is saved",detail:comment})
  });
});

app.post("/updateblog",(req,res)=>{
  let id = req.body.id;
  let title = req.body.title;
  let body = req.body.body;
  Blog.updateOne({_id:id}, 
    {body:body,title:title}, function (err, docs) {
      if (!err){
        res.status(201).json({message:"update succesfully",docs:docs})
      }
    });
  });
  
  app.post("/deleteblog/:id",(req,res)=>{
    const payload = req.params.id;
    Blog.deleteOne({_id:payload},(err,blog)=>{
      res.status(201).json({message:"blog deleted succesfully",blog:blog})
    })
  });

  app.post("/like",(req,res)=>{
    console.log(req.body)
    const like = new Like({
      userId:req.body.userId,
      blogId:req.body.blogId,
      like:true
    })
    like.save(()=>{
      res.status(201).json({message:"like is saved", docs:like})
    })
  })
  
  app.get("/like/:blogId/:userId",(req, res) => {
    const { blogId, userId } = req.params;
    let detect = true;
    Like.find({blogId, userId},(err,user)=>{
      detect = user[0].like;
      Like.updateOne({ blogId, userId },{
        like:!detect
       },(err,like)=>{     
         res.status(201).json({message:"like changed",user:user[0]});
        });
    })
  });
 
  //tests start
  app.get("/blog/:blogTitle",(req,res)=>{
    const blogTitle = req.params.blogTitle;
    Blog.find({title:blogTitle},(err,user)=>{
      res.status(201).json(user)
    })
  })
  
  app.post("/blog/:blogTitle",(req,res)=>{
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
  
  app.listen(process.env.PORT, function() {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
  });