import  jwt  from "jsonwebtoken";
import Person from "../Models/UserModel.js";
import bycrpt from "bcrypt"; 
import "dotenv/config.js"


const generateToken=(_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn:30000});
}

const registerUser=async(req,res)=>{

  try{


    const {email,password}=req.body;

    console.log(email,password)


    const user=await Person.findOne({email:email});
  
  
    if(user){
      return res.status(400).json({error:"User Exist"})
     }

    const salt= await bycrpt.genSalt();

    const hashedPassword= await bycrpt.hash(password,salt);

    const newUser=new Person({email,password:hashedPassword});

    const saveUser= await newUser.save();

    console.log(saveUser);

    const token=generateToken(saveUser._id);

    res.status(200).json({email:saveUser.email,token:token})

  }
  catch(error){
   return res.status(500).json({error:error.message})
  }

}


const loginUser=async(req,res)=>{

  try{

    const {email,password}=req.body;

    console.log(email,password)

    const user=await Person.findOne({email:email});

    if(!user){
      return res.status(400).json({error:"invalid email"})
    }

    const isPasswordMatched=await bycrpt.compare(password,user.password);

    if(!isPasswordMatched){
      return res.status(400).json({error:"invalid password"})
    }

    const token=generateToken(user._id);

    res.status(200).json({email:email,token:token})

  }
  catch(error){
    res.status(500).json({errpr:error.message})
  }

}



//*******************Register ************/


export {registerUser,loginUser};