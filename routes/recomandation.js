const express=require('express');
const { User } = require('../models');
const router=express.Router()

router.get('/recomandation/:userId',(req,res)=>{
    
    User.find().exec((err,post)=>{
        if (err) throw err;
        console.log(post)
    })
})



module.exports=router;
