const users=require("../model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require("./user");

module.exports={
    getUsername:async(req, res)=>{
       try{
        const token=req.headers.authorization.split(" ")[1];
        if(token){
            const decodedToken=jwt.decode(token);
            const {username}=decodedToken;
            const user=await users.findOne({username:username});
            
            if(user){
                const {username}=user;
               return  res.status(200).json({username});
            }
            else{
                return res.status(500).json({'msg':'cannot find user'});
            }
            
        }
        else{
           return  res.status(500).json({"msg":'No have token'});
        }
       }
       catch(err){
           return res.status(500).json(err);
       }
        
    },
    getInforUser:async(req,res)=>{
            try{
                const token=req.headers.authorization.split(' ')[1];
                if(token){
                    const {username}=jwt.decode(token);
                    const user=await users.findOne({username});
                    if(user){
                        return res.status(200).json({'username':user.username,
                        'email':user.email
                    });

                    }
                    else{
                        return res.status(500).json({'msg':'cannot find user'});
                    }
                }
                else{
                    return res.status(500).json({'msg':'No have token'});
                }
            }
            catch(err){
                return res.status(500).json(err);
            }
    },
    updateUserPassword:async(req, res)=>{
       try{
        const {username}=req.params;
        const {password}=req.body;
        const saltRounds = 10;
        const changePassword=await bcrypt.hash(password,saltRounds);
        const user=await users.findOne({username});
        if(user){
            const {_id}=user
          await users.findByIdAndUpdate({_id},{password:changePassword});
                return res.status(200).json({'msg':'success'});
        }
        else{
            return res.status(500).json({'msg':'cannot update'})
        }
       }
       catch(err){
           return res.status(500).json({'err':'have error !'});
       }
    
        
    }


}