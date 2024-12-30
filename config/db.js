const mongoose= require("mongoose")

 function connections(){
    mongoose.connect(process.env.MONGO_URI).then(console.log("database connected"))
 }

 module.exports=connections;