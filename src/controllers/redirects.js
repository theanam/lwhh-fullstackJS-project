const router         = require('express').Router();
const {Direction}    = require('../utils/db'); 
const {check}        = require('express-validator/check');
const rejectInvalid  = require('../middlewares/reject_invalid');
const _p             = require('../utils/promise_errors');
const path           = require('path');
const entryValidator = [check('url').isURL()]
router.post('/api/v1/redirects',entryValidator,rejectInvalid,async (req,res,next)=>{
    let user_id = req.user.id;
    let destination = req.body.url;
    let timestamp = Date.now()/1000;
    // Creating a base32 Number : 1,2,3,4,5,6,7,8,9,0,a,b,c.......
    let hash = parseInt(`${user_id}${timestamp}`).toString(32);
    let [cretErr,created] = await _p(Direction.create({
        user_id,destination,hash
    }));
    if(cretErr && !created){
        next(cretErr);
    }
    else{
        res.json({
            message:"Direction creted Successfully",
            hash
        })
    }
});

router.get('/api/v1/redirects',async (req,res)=>{
    let [dberr,myDirections] = await _p(Direction.findAll({
        where:{
            'user_id':req.user.id
        }
    }));
    if(dberr) return next(dberr);
    return res.json(myDirections.map(d=>{return {hash:d.hash,destination:d.destination,id:d.id,created_at:d.createdAt}}));
});
router.get(`/:hash`,async (req,res,next)=>{
    let URLhash = req.param('hash');
    let [dberr,hashDirection] = await _p(Direction.find({
        where:{
            'hash':URLhash
        }
    }));
    if(dberr) return next(dberr);
    if(hashDirection){
        console.log(hashDirection.dataValues.destination);
        res.redirect(301,hashDirection.dataValues.destination);
    }
    else{
        next();
    }
});
router.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../frontend/build/index.html'));
});
module.exports = router;