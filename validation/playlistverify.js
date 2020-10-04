    const jwt=require('jsonwebtoken')
   const  playlistverify=async (req, res,next)=>{
     try {
            const {authorization}=req.headers;
            if(authorization){
                let token=authorization.split(" ")[1];
                if(token){
                        try {
                            const verifytoken=await jwt.verify(token,process.env.secretkey);
                                if(verifytoken){
                                    next();
                                }
                        } catch (error) {
                                return res.status(500).json({
                                    "msg":"token error"
                                })
                        }
                }
                else{
                    return res.json({"msg":"access denied"});
                }
                
            }
            else{
                
                return res.json({
                    "msg":"access denied"
                })
            }
            
            
     } catch (error) {
         res.status(500).send(error);
     }   
    }
    module.exports =playlistverify;
