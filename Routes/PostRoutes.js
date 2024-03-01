import express from "express";
import { deletePost, getPost, getPostById, CreatePost, updatePost,getUserPosts } from "../Controllers/PostController.js";
import jwtAuthMiddleware from "../Middleware/auth.js";

const router=express.Router();

router.get('/',getPost)
router.post('/',jwtAuthMiddleware,CreatePost)
router.get('/id/:id',jwtAuthMiddleware,getPostById)
router.put('/:id',jwtAuthMiddleware,updatePost)
router.get('/user',jwtAuthMiddleware,getUserPosts);
router.delete('/:id',jwtAuthMiddleware,deletePost)

export default router;