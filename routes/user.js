const express=require('express')
const router=express.Router()
const { User, transporter, UserInfo } = require('../models.js');
const passport = require("passport");
const template=require('./template')


router.post("/signup",function(req,res){
    User.register({username:req.body.username,email:req.body.email,role:req.body.role}, req.body.password,
      function(err,user){
      if(err){
        res.status(201).json({err});
      }else{
        passport.authenticate("local")(req,res,function(){
            
            var mailData = {
              from: 'autumnkurenai@gmail.com',
              to: req.body.email,
              subject: 'Welcome to Kurenai',
              html: template,
            };

            transporter.sendMail(mailData, (error, info) => {
              if (error) return console.log(error);
      
              res.status(201).json({ message:"user signup successfully", user, message_id: info.messageId });
            });
        })
      }
    })
});

router.post('/changepassword', function (req, res) {
  User.findByUsername(req.body.username, (err, user) => {
      if (err) {
          res.send(err);
      } else {
          user.changePassword(req.body.oldpassword, 
          req.body.newpassword, function (err) {
              if (err) {
                  res.send(err);
              } else {
                  res.send('successfully change password')
              }
          });
      }
  });
});

router.post('/userinfo/:userId', function (req, res) {
const userInfo = new UserInfo({
    userId:req.params.userId,
    body:req.body.body
})
    userInfo.save((err,info)=>{
      if (err) throw err;
      res.status(201).json({message:"userInfo saved", info});
    });
});

router.get('/userinfo/:userId', function (req, res) {
  const userId = req.params.userId; 
  User.find({_id:userId},(err,user)=>{

  UserInfo.findOne({userId},(err,userInfo)=>{
    res.status(201).json({user,userInfo});
    })
  })
});

router.post('/userUpdate/:userId', async (req, res) => {
  try {
    const _id = req.params.userId; 
    const { username, email } = req.body; // assuming these are the fields the user can update

    User.updateOne({_id},
      {username,email},
      (error,docs)=>{
        if (error) throw error;
        res.status(201).json({message:"User profile updated successfully",docs});
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred while updating user profile' });
  }
});


module.exports=router;