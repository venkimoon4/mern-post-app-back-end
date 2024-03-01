import mongoose from "mongoose";
import "dotenv/config.js"
// const mongoDBURLocal="mongodb://127.0.0.1:27017/Post_App";

mongoose.connect(process.env.MongoDBAtlas);

const db=mongoose.connection;

db.on('connected',()=>{
console.log('connected to mongodb server')
})

db.on("error",()=>{
  console.error("error in connecting mongodb server")
})

db.on("disconnected",()=>{
  console.log('mongodb server disconnected')
})

export default db;
