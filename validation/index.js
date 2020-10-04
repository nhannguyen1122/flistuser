const users=require('../model/index');
const bcrypt = require('bcrypt');

module.exports={
    registervalidation: async (req, res,next)=>{
        const{username,email,password}=req.body;
        if(!email.match(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/)){
           
            return res.status(500).json({ 
                "msg":" invalid email"

            });
        }
         if( username.length<=6){
            return res.status(500).json({
                "msg":" username at least 6 characters"
            })
        }
         if( password.length<=6){
            return res.status(500).json({
                "msg":" password at least 6 characters"
            })
        
        }
        else{
            const existusername= await users.findOne({username:username});
            const existemail= await users.findOne({email:email});
            if(existusername||existemail){
                return res.status(500).json({
                    "msg":" already exists"
                });
            
            }
            else{
                next();
            }
          
        }
    },

    logingvalidation: async(req, res,next)=>{
       try {
            const{username,password} = req.body;
            
            const  existusername= await users.findOne({username:username});
            
            if(existusername){
                const match = await bcrypt.compare(password, existusername.password);
                if( match){
                    next();
                }
                else{
                    return res.status(500).json({
                        "msg":" password incorrect"
                    })
                }
            }
            else{
                return res.status(500).json({
                    "msg":"username does not exist"
                })
            }
       } catch (error) {
           return res.status(500).json(error);
       }
    }
}