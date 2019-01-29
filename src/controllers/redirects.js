const router        = require('express').Router();
const {Direction}   = require('../utils/db'); 
const {check}       = require('express-validator/check');
const rejectInvalid = require('../middlewares/reject_invalid');

const entryValidator = [check('url').isURL()]
router.post('/api/v1/redirects',entryValidator,rejectInvalid,(req,res,next)=>{
    
})



module.exports = router;