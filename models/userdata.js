const mongoose= require("mongoose")
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
})


const userModel=mongoose.model("users",UserSchema)

module.exports=userModel;