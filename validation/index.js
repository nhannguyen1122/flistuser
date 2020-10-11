const users=require('../model/index');
const bcrypt = require('bcrypt');
const emailExistence=require('email-existence')
module.exports={
    registervalidation: async (req, res,next)=>{
        const{username,email,password}=req.body;
        emailExistence.check(email, async(error, response)=>{
            
           if(error){
               return res.status(500).json({'msg':'sever error'});
           }
           else{
                    if(response){
                        const existusername= await users.findOne({username:username});
                    const existemail= await users.findOne({email:email});
                    if(existusername){
                        return res.status(500).json({
                            "msg":" username has already been taken"
                        });
                    
                    }
                    else if(existemail){
                        return res.status(500).json({"msg":"this email exists"})
                    }
                    else{
                        next();
                    }
                        }
                        else{
                            return res.status(500).json({ 
                                "msg":"this email does not exist"

                            });
                        }
           }
        });
        
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
                    return res.status(401).json({
                        "msg":" incorrect username or password "
                    })
                }
            }
            else{
                return res.status(401).json({
                    "msg":" incorrect username or password "
                })
            }
       } catch (error) {
           return res.status(500).json(error);
       }
    }
}