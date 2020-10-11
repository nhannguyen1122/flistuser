let express=require('express');
let inforUser=require('../controller/inforUser');
let router=express.Router();

router.get('/getUsername',inforUser.getUsername);
router.get('/infor',inforUser.getInforUser);
router.patch('/update/:username',inforUser.updateUserPassword);


module.exports= router;