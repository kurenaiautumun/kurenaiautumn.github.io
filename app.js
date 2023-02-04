//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
var cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

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
});

const  commentSchema = new mongoose.Schema({
  userId:String,
  blogId:String,
  body:String,
  status:String
});

const Blog = new mongoose.model("blog",blogSchema);
const Comment = new mongoose.model("comment",commentSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/signup",(req,res)=>{
  res.status(201).render("signup")  
});

app.get("/login",(req,res)=>{
  res.status(201).render("login")  
});

app.get("/dashboard/:userid",(req,res)=>{
  const userId = req.params.userid
  User.find({_id:userId},(err,user)=>{
    if(req.isAuthenticated()){
      Blog.find({userId:userId},(err,posts)=>{
        res.status(201).render("dashboard",{user:user,posts:posts})
      })
  }else{
      res.redirect("/login");
  }
  })
});

app.post("/register",function(req,res){
  User.register({username:req.body.username}, req.body.password,
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


app.get("/",(req,res)=>{
    Blog.find({},(err,posts)=>{
      // res.render("index",{posts:posts})
      res.status(201).status(201).json(posts);
    })   
});

app.get("/del/:id",(req,res)=>{
  const payload = req.params.id;
  Blog.deleteOne({_id:payload},(err,post)=>{
    res.status(201).redirect("/dashboard")
  })
});

app.get("/edit/:id",(req,res)=>{
  const id = req.params.id;
  Blog.find({_id:id},(err,posts)=>{
    // res.render("editor",{posts:posts})
    res.status(201).json(posts)
  })
});

app.get("/api/data",(req,res)=>{
  console.log("runs")
  res.json("swayam")
});


app.post("/newblog",(req,res)=>{
  
  const blog = new Blog({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
    views:req.body.views,
    status:req.body.status
    });
    blog.save();
    User.find({_id:req.body.userId},(err,user)=>{
        res.status(201).redirect("/dashboard/"+ user[0]._id);
    })

});

app.post("/updateData",(req,res)=>{
   let id = req.body.id;
    let username = req.body.username;
    let blog = req.body.blog;
    Blog.updateOne({_id:id}, 
      {blog:blog,username:username}, function (err, docs) {
      if (!err){
        console.log("Updated Docs : ", docs);
      }
  });
  res.status(201).redirect("/dashboard")
});


app.listen(process.env.PORT, function() {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});

