const jwt           = require('jsonwebtoken');
const {app_secret}  = require('../config.json');
module.exports = function(req,res,next){

    if(!req.header('auth-token')){
        return next(new Error("User not authorized"));
    }
    let token = req.header('auth-token');
    jwt.verify(token,app_secret,(err,userInfo)=>{
        if(err){
            return next(err);
        }else{
            req.user = userInfo;
            //console.log(userInfo);
            next();
        }
    });
    
}