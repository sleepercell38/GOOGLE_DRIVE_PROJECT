const express= require("express")
const app =express();
const userroutes=require("./routes/user.routes")
const indexroutes=require("./routes/index.routes")
const userModel=require("./models/userdata")
const database=require("./config/db")
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser")      //cookie parser is used to parse the cookie from the request and response  
dotenv.config()


app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
database()


app.use("/user",userroutes)
app.use("/",indexroutes)



app.listen(3000);