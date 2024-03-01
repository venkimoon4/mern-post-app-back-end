import express from "express"
import db from "./db.js";
import router from "./Routes/PostRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
const app=express();

app.use(cors())
// app.use(express.json());
app.use(bodyParser.json());


app.use('/api/posts',router)
app.use('/api/users',userRouter)

app.listen(4000,()=>{
  console.log('Listening to Port',4000)
})