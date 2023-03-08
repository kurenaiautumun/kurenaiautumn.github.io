const express=require('express');
const { User } = require('../models');
const router=express.Router()

router.get('/recomandation/:userId',(req,res)=>{
    console.log("working")
    User.find().exec((err,post)=>{
        if (err) throw err;
        console.log(post)
    })
})



module.exports=router;
