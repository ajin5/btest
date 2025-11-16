import jwt from "jsonwebtoken";


const VerifyUser = (req,res)=>{
    const token = req.cookies.auth;
    if(!token){
        return res.status(401).json({message:"unauthenticated"})
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({message:"user verified"})

    }catch(err){
        return res.status(401).json({message:"unauthenticated"})

    }

}

export default VerifyUser