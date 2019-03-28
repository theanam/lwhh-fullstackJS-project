module.exports = function(req,res,next){
    if(process.env.CORS==="yes"){
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,auth-token");
        if(req.method==='OPTIONS'){
            return res.status(200).end();
        }
    }
    next();
}