//jshint esversion:6
require('dotenv').config();
const express = require("express");
const app = express();
var cors = require('cors');
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const { User, Blog, Comment, Like, corsOptions, Review, toggle } = require('./models.js');
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

app.get("/dashboard/:userId",(req,res)=>{
  const userId = req.params.userId
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

app.post("/newBlog",(req,res)=>{
  const blog = new Blog({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
    views:req.body.views,
    status:req.body.status,
    date:date
  });
  blog.save((err,response)=>{
    const like = new Like({
      blogId : response._id,
      likes: {"1":"sample"}
    })
    like.save(()=>{
      User.find({_id:req.body.userId},(err,user)=>{
        if (err) throw err;
        res.status(201).json({message:"blog saved",user:user[0],blog:response, like});
      });
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

app.post("/updateBlog",(req,res)=>{
  let {id, title, body} = req.body;
  Blog.updateOne({_id:id}, 
    {body:body,title:title}, function (err, docs) {
      if (!err){
        res.status(201).json({message:"update succesfully",docs:docs})
      }
    });
  });
  
  app.post("/deleteBlog/:id",(req,res)=>{
    const payload = req.params.id;
    Blog.deleteOne({_id:payload},(err,blog)=>{
      res.status(201).json({message:"blog deleted succesfully",blog:blog})
    })
  });

  app.get("/like/:blogId/:userId",(req,res)=>{
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
  
  app.post("/like/:blogId/:userId",(req,res)=>{
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

  app.get("/review/:blogId",(req,res)=>{
    const blogId = req.params.blogId;
    Review.find({blogId},(err,review)=>{
      res.json({message:"review details",blogId, review})
    })
  })

  app.post("/newReview",(req,res)=>{
    const review = new Review({
      blogId: req.body.blogId,
      userId:req.body.userId,
      body:req.body.body,
      score:req.body.score
    }) 
    review.save();
    res.json({message:"review is saved",review})
  })
  
  
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