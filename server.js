import express from "express"
import db from "./db.js";
import router from "./Routes/PostRoutes.js";
import userRouter from "./Routes/UserRoutes.js";

const app=express();

app.use(express.json());
app.use('/api/posts',router)

app.use('/api/users',userRouter)

app.listen(4000,()=>{
  console.log('Listening to Port',4000)
})