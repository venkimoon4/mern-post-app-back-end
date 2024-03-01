import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const jwtAuthMiddleware=async(req,res,next)=>{

  const {authorization}=req.headers;

  if(!authorization){
    return res.status(400).json({err:"token not found"})
  }

  try{

    const token=authorization.split(' ')[1];

    if(!token){
      return res.json({err:'token not found'})
    }

    const {_id}=jwt.verify(token,process.env.SECRET);
    req.userId=await User.findById(_id).select("_id");

    next();
  }
  catch(err){
    res.status(500).json({err:err.message})
  }

}

export default jwtAuthMiddleware;