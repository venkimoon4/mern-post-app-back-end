import mongoose from "mongoose";

const personSchema=mongoose.Schema({

  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }

})

const Person=mongoose.model("Person",personSchema);

export default Person;