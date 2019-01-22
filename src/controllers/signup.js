// প্রথম লাইন বড় করে লিখলে হতো:
// const express = require('express');
// const router = express.Router();
// কিন্তু আমরা ছোট করে এক লাইনে লিখলাম:
const router                   = require('express').Router();
const {check,validationResult} = require('express-validator/check');
const {generate}               = require('../utils/passwords');
const {User}                   = require('../utils/db');
const _p                       = require('../utils/promise_errors');
// আমরা রিকুয়েস্টের সাথে তিনটা ডাটা নিবো, সবসময় রিকুয়েস্টের ডাটা ভ্যালিডেট করতে হবে 
const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min:5})
];
router.post('/signup',signupValidator,async (req,res,next)=>{
    const errors = (validationResult(req));
    if(!errors.isEmpty()){
        return res
            .status(422)
            .json({ errors: errors.array() });
    }
    // পাসওয়ার্ড সেভ করার আগে হ্যাশ করে নেয়া হবে
    let chunks = generate(req.body.password);
    // সল্ট আর হ্যাশ একসাথে কম্বাইন করে একটা ডাটা তৈরী করে নিয়ে, সেটাই ডাটাবেজে সেভ রাখা হবে
    let password =`${chunks.salt}.${chunks.hash}`;

    let {name,email} = req.body; 
    let [ucErr,userCreated] = await _p(User.create({
        name,email,password
    }));
    if(ucErr && !userCreated){
        return next(ucErr);
    }
    else{
        res.json({error:false,message:"User created"});
    }
})

module.exports = router;