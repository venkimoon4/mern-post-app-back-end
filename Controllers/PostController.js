import Post from "../Models/PostModel.js";
import Person from "../Models/UserModel.js";
import router from "../Routes/PostRoutes.js";


// ===============================Get======================///

const getPost=async(req,res)=>{

  try{
    const posts=await Post.find().sort({createdAt:"desc"})
    res.status(201).json(posts);
  }
  catch(err){
    res.status(500).json({err:err.message})
  }

}


// =============================Post=======================//


const CreatePost=async(req,res)=>{

  try{

    const {title,body}=req.body;

    const user= await Person.findById(req.userId._id)

    const newPost= new Post({title,body,user:user._id})

    const savedPost=await newPost.save();

    res.status(200).json({message:"Post Saved To DB",savedPost})

  }
  catch(err){
    res.status(500).json({err:err.message})
  }

}


//================Get Post By ID==========================//

const getPostById=async(req,res)=>{

  try{

    const id=req.params.id;

    const PostData= await Post.findById(id);

    res.status(201).json({message:"Data Fetched By Id",PostData})

  }
  catch(err){
    res.status(500).json({err:err.message})
  }

}


//==============================Get Users Post================================//

const getUserPosts=async(req,res)=>{

  const user= await Person.findById(req.userId._id)

  try{

    const userPosts=await Post.find({user:user._id}).sort({createdAt:"desc"})
    
    res.status(200).json({userPosts,email:user.email});
  }
  catch(err){
    return res.status(500).json({err:err.message})
  }
}


//===========================Put===============================//

const updatePost=async(req,res)=>{

  try{

    const id=req.params.id;

    const post=await Post.findById(id);

    if(!post){
      return res.status(400).json({err:"post not found to update"})
    }

    const user= await Person.findById(req.userId._id)

    if(!post.user.equals(user._id)){
      return res.status(400).json({err:"you are not authorized"})
    }

    const {title,body}=req.body;

    if(!title||!body){
      return res.status(400).json({err:"all fields are required"})
    }

    const updatePost= await Post.findByIdAndUpdate(id,{title,body})
    res.status(201).json({message:"post data updated",updatePost})

  }
  catch(err){
    res.status(500).json({err:err.message})
  }

}


const deletePost=async(req,res)=>{

  try{

    const id=req.params.id;

    const post=await Post.findById(id);

    if(!post){
      return res.status(400).json({err:"post not found to update"})
    }

    const user= await Person.findById(req.userId._id)

    console.log(user);

    if(!post.user.equals(user._id)){
      return res.status(400).json({err:"you are not authorized"})
    }

    const deletePost=await Post.findByIdAndDelete(id);
    res.status(200).json({success:"post deleted"})
  }
  catch(error){
    res.status(500).json({error:error.message})
  }

}

export {getPost,CreatePost,updatePost,deletePost,getPostById,getUserPosts};
