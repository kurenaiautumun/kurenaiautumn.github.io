//jshint esversion:6
require('dotenv').config();
const express = require("express");
var cors = require('cors');
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const date = new Date().toLocaleDateString();

const corsOptions = {
  origin:'*', 
  credentials:true, 
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(session({
  secret:  process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOLAB_URI,{useNewUrlParser: true});

const  userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User",userSchema);


const  blogSchema = new mongoose.Schema({
  title:String,
  keys:Array,
  body:String,
  userId:String,
  views:String,
  status:String,
  date:String,
});

const  commentSchema = new mongoose.Schema({
  userId:String,
  blogId:String,
  body:String,
  status:String,
  date:String
});

const Blog = new mongoose.model("blog",blogSchema);
const Comment = new mongoose.model("comment",commentSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    Blog.find({},(err,posts)=>{
      res.status(201).status(201).json(posts);
    })   
});

app.get("/signup",(req,res)=>{
  res.status(201).json("signup")  
});

app.get("/login",(req,res)=>{
  res.status(201).json("login")  
});

app.get("/dashboard/:userid",(req,res)=>{
  const userId = req.params.userid
  User.find({_id:userId},(err,user)=>{
    if(req.isAuthenticated()){
      Blog.find({userId:userId},(err,posts)=>{
        res.status(201).json({dashboard:"dashboard",user:user,posts:posts})
      })
  }else{
      res.redirect("/login");
  }
  })
});

app.get("/blog",(req,res)=>{
    const blogId = req.query.blogId;
  Blog.find({_id:blogId},(err,user)=>{
    res.json(user)
  })
})

//tests start
app.get("/blog/:blogTitle",(req,res)=>{
  const blogTitle = req.params.blogTitle;
  Blog.find({title:blogTitle},(err,user)=>{
    res.json(user)
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
  res.json("blog saved");
})
//tests ends

app.get("/comment/:blogId",(req,res)=>{
  const blog = req.params.blogId;
  Comment.find({blogId:blog},(err,user)=>{
    res.json(user);
  })
})

app.post("/signup",function(req,res){
  User.register({username:req.body.username,email:req.body.email}, req.body.password,
    function(err,user){
    if(err){
      console.log(err);
      res.status(201).redirect("/signup");
    }else{
      passport.authenticate("local")(req,res,function(){
        res.status(201).redirect("/dashboard/"+ user._id);
      })
    }
  })
});

app.post("/login",function(req,res){
  // const sending = req.query.sending
  const user = new User({
    username: req.body.username,
    password: req.body.password
   });
   req.login(user, function(err){
    if(!err){
        passport.authenticate("local")(req,res,function(){
          User.find({username:user.username},(err,user)=>{
            res.status(201).redirect("/dashboard/"+ user[0]._id);
          })
        })
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
  blog.save();
  User.find({_id:req.body.userId},(err,user)=>{
    res.status(201).redirect("/dashboard/"+ user[0]._id);
  })
});

app.post("/newComment",(req,res)=>{
  const comment = new Comment({
    userId:req.body.userId,
    blogId:req.body.blogId,
    body:req.body.body,
    status:req.body.status,
  date:date
  });
  comment.save();
  res.status(201).json("comment is save")
});

app.post("/updateData",(req,res)=>{
  let id = req.body.id;
  let title = req.body.title;
  let newblog = req.body.newblog;
  Blog.updateOne({_id:id}, 
    {blog:newblog,title:title}, function (err, docs) {
      if (!err){
        console.log("Updated Docs : ", docs);
      }
    });
    res.status(201).redirect("/dashboard")
  });
  
  app.post("/del/:id",(req,res)=>{
    const payload = req.params.id;
    Blog.deleteOne({_id:payload},(err,post)=>{
      res.status(201).redirect("/dashboard")
    })
  });
  
  
  app.listen(process.env.PORT, function() {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
  });

