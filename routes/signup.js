const express=require('express')
const router=express.Router()
const { User, transporter } = require('../models.js');
const passport = require("passport");


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
              subject: 'Sending Email mailer',
              template: 'sample',
              context: {
                name: "Abhinav"
              }
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

module.exports=router;