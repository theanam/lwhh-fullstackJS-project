const {User}                   = require('../utils/db');
const _p                       = require('../utils/promise_errors');
const router                   = require('express').Router();
const jwt                      = require('jsonwebtoken');
const {check,validationResult} = require('express-validator/check');
const {validate}               = require('../utils/passwords');
const {app_secret}             = require("../config.json");

const loginValidator = [check('email').isEmail(),check('password').isLength({min:5})];
router.post('/login',loginValidator, async (req,res,next)=>{
    const errors = (validationResult(req));
    if(!errors.isEmpty()){
        return res
            .status(422)
            .json({ errors: errors.array() });
    }
    let {password,email} = req.body;
    let [uer,user] = await _p(User.findOne({
        where:{
            email
        }
    }));
    if(uer && !user){
        return next(uer);
    }
    else{
        // console.log(user.password);
        let [salt,hash] = user.password.split(".");
        let {name,email,id} = user;
        let valid = validate(password,hash,salt);
        if(valid){
            let token = jwt.sign({id,name,email},app_secret);
            res.json({
                error:false,
                token,
                user:{
                    id,name,email
                }
            });
        }
        else{
            next(new Error("Password Invalid"));
        }
    }
})

module.exports = router;