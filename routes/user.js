const express=require('express')
const router=express.Router()
const { User, transporter, UserInfo } = require('../models.js');
const passport = require("passport");
const template=require('./template')


router.post("/signup",function(req,res){
    User.register({username:req.body.username,email:req.body.email}, req.body.password,
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
    UserInfo.findOne({userId},(err,userInfo)=>{
      res.status(201).json({userInfo});
    })
});

router.get('/userUpdate', async (req, res) => {
  try {
    const user = req.user; // assuming you have middleware that sets the user object on the request
    const { name, email, bio, profilePicture } = req.body; // assuming these are the fields the user can update

    // Update user information based on what was provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;

    // Save the updated user object to the database
    await user.save();

    // Send a success response back to the client
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred while updating user profile' });
  }
});


module.exports=router;