const router         = require('express').Router();
const {Direction}    = require('../utils/db'); 
const _p             = require('../utils/promise_errors');
const Op             = require('sequelize').Op;
router.get('/:hash',async (req,res,next)=>{
    let hash = req.params.hash;
    if(!hash) next(new Error("No redirect found"));
    let [hashErr,hashfound] = await _p(Direction.findOne({
          where:{
            hash:{
                [Op.eq]:hash
            }
        }
    }));
    if(hashErr || !hashfound){
        return next(hashErr);
    }
    else{
        console.log(`dest: ${hashfound.destination}`);
        res.redirect(hashfound.destination);
    }
})



module.exports = router;