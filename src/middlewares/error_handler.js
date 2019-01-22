module.exports = function(err,req,res,next){
    res.status(400).json({
        error:true,
        message:err.message
    })
}