require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");

const {corsOptions} = require('./models.js');
const blogRoute=require('./routes/blog')
const dashRoute=require('./routes/dashboard')
const loginRoute=require('./routes/login')
const signupRoute=require('./routes/signup')
const commentRoute=require('./routes/comments')
const followRoute=require('./routes/follow')
const likeRoute=require('./routes/likes')
const reviewRoute=require('./routes/review')
const bucketRoute=require('./routes/bucket')
const recomandationRoute=require('./routes/recomandation')


app.use(cors(corsOptions))
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret:process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOLAB_URI,{useNewUrlParser: true});

app.use("/",blogRoute)
app.use("/",dashRoute)
app.use("/",signupRoute)
app.use("/",loginRoute)
app.use("/",bucketRoute)
app.use("/",followRoute)
app.use("/",reviewRoute)
app.use("/",commentRoute)
app.use("/",reviewRoute)
app.use("/",likeRoute)
app.use("/",recomandationRoute)


app.listen(process.env.PORT, function() {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});