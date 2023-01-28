//jshint esversion:6
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

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


const  postSchema = new mongoose.Schema({
  username:String,
  blog:String,
});
const Post = new mongoose.model("Post",postSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
    Post.find({},(err,posts)=>{
      res.render("index",{posts:posts})
    })   
});

app.get("/del/:id",(req,res)=>{
  const payload = req.params.id;
  Post.deleteOne({_id:payload},(err,post)=>{
    res.redirect("/")
   })
});

app.get("/edit/:id",(req,res)=>{
  const id = req.params.id;
  Post.find({_id:id},(err,posts)=>{
    res.render("editor",{posts:posts})
  })
});


app.post("/blog",(req,res)=>{
    const post = new Post({
        username: req.body.username,
        blog: req.body.blog
    });
    post.save();
    res.redirect("/")
});

app.post("/addData",(req,res)=>{
   let id = req.body.id;
    let username = req.body.username;
    let blog = req.body.blog;
    Post.updateOne({_id:id}, 
      {blog:blog,username:username}, function (err, docs) {
      if (!err){
        console.log("Updated Docs : ", docs);
      }
  });
  res.redirect("/")
});


app.listen(process.env.PORT, function() {
    console.log(`Server started on port ${process.env.PORT}`);
});

