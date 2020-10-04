let express=require('express');
let router=express.Router();
let control=require('../controller/user');
let validate=require('../validation');
router.post('/register',validate.registervalidation,control.register);
router.post('/login',validate.logingvalidation,control.login);

module.exports=router;