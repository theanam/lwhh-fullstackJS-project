const jwt           = require('jsonwebtoken');
const {app_secret}  = require('../config.json');
module.exports = function(req,res,next){

    if(!req.header('auth-token')){
        return res.status(401).json({
            error:true,
            message:"User not authenticated"
        })
    }
    let token = req.header('auth-token');
    jwt.verify(token,app_secret,(err,userInfo)=>{
        if(err){
            return res.status(401).json({
                error:true,
                message:"User not authenticated"
            });
        }else{
            req.user = userInfo;
            console.log(userInfo);
            next();
        }
    });
    
}