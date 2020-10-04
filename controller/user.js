
const users=require("../model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds=10;
module.exports={
    register:async(req,res)=>{
       try{
        const{username,email,password}=req.body;
        const hashpassword=await bcrypt.hash(password, saltRounds);
        
        let newUsers=new users({
            username:username,
            password:hashpassword,
            email:email,
            playlists:[],

        });
        await newUsers.save();
        res.status(200).json({
            "msg":"success",
        })

       }
       catch(err){
           res.status(500).send(err);
       }
    },
    login: async(req,res)=>{
       const{username,password} = req.body;
       var token = await jwt.sign({username:username}, process.env.secretkey);
      return res.status(200).json({
          "msg":'login success',
          "token":token
      })
    }
    
}