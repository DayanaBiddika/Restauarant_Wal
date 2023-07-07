const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=(req,res,next)=>{
    //get bearer token from headers of token
    let bearerToken=req.headers.authorization;

    //check presence of bearer token
    if(bearerToken==undefined){
        res.send({message:"unauthorised access"})
    }
    //if bearer token is existed get token from bearer token
    else{
        let token=bearerToken.split(".")[1];
        
        try{
            //decode the token
            let decoded=jwt.verify(token,process.env.SECRET_KEY);
            next()
        }
        catch(err){
            res.send({message:"plz relogin to continue"})
        }
    }
    
}
//export
module.exports=verifyToken;

