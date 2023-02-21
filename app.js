require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
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

app.get("/blog",(req,res)=>{
  const _id = req.query.blogId;
    Blog.find({_id},(err,user)=>{
      res.status(201).json(user)
    })
})


app.post("/signup",function(req,res){
  User.register({username:req.body.username,email:req.body.email}, req.body.password,
    function(err,user){
    if(err){
      res.status(201).json({err:err});
    }else{
      passport.authenticate("local")(req,res,function(){
        res.status(201).json({message:"user signup successfully", user});
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
          User.findOne({username:user.username},(err,user)=>{
            res.status(201).json({message:"user login successfully",user});
          })
        })
    }else{
      res.status(404).json("username or password is wrong")
    }
   })
})

app.post("/newBlog",(req,res)=>{
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



app.post("/updateBlog",(req,res)=>{
  let {id, title, body} = req.body;
  Blog.updateOne({_id:id}, 
    {body,title}, function (err, docs) {
      if (!err){
        res.status(201).json({message:"update succesfully",docs})
      }
    });
  });
  
  app.post("/deleteBlog/:id",(req,res)=>{
    const payload = req.params.id;
    Blog.deleteOne({_id:payload},(err,blog)=>{
      res.status(201).json({message:"blog deleted succesfully",blog})
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

  app.get("/comment/:blogId",(req,res)=>{
    const blogId = req.params.blogId;
    Comment.find({blogId},(err,user)=>{
      res.status(201).json({message:"all comments of blog", user});
    })
  })
  
  app.post("/newComment",(req,res)=>{
    const {userId, blogId, body, status} = req.body;
    const comment = new Comment(
      { userId, blogId, body, status, date }
      )
    comment.save(()=>{
      res.status(201).json({message:"comment is saved", comment})
    });
  });

  app.get("/review/:blogId",(req,res)=>{
    const blogId = req.params.blogId;
    Review.find({blogId},(err,review)=>{
      res.status(201).json({message:"review details",blogId, review})
    })
  })

  app.post("/newReview",(req,res)=>{
    const {userId, blogId, body, score} = req.body;
    const review = new Review({ 
      userId, blogId, body, score, date 
    })
    review.save();
    res.status(201).json({message:"review is saved",review})
  })

  app.get("/follow/:userId",(req,res)=>{
    const _id = req.params.userId;
    User.findOne({_id},(err,user)=>{
      const {followers , username, following} = user;
      res.status(201).json({message:"followers details",username, followers, following})
    })
  })

  app.post("/follow/:userId",(req,res)=>{
    const _id = req.params.userId;
    const {followers, following} = req.body;
    User.updateOne({_id}, 
      {$push:{followers,following}}, function (err, docs) {
        if (!err){
          res.status(201).json({message:"update succesfully",docs})
        }
      });
  })
  
  
  //tests start
  app.get("/blog/:blogTitle",(req,res)=>{
    const title = req.params.blogTitle;
    Blog.find({title},(err,user)=>{
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