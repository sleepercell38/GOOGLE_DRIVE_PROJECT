

const express = require("express")
const router = express.Router();
const { body, validationResult } = require("express-validator");   // impotring express-validator which is used to validate the data and is a custom 3rd party middle ware
const userModel = require("../models/userdata");
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")



//register route

router.get("/register", async (req, res) => {
    res.render("register")
})
router.post("/register",
    body("email").trim().isEmail().isLength({ min: 10 }),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),     //here we would use some 3rd party middle ware to check wheather the user input data is valid or not


    async (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const { username, email, password } = req.body;

            const hashpassword = await bcrypt.hash(password, 10)    //bcrypt is used to hash the password and store it in the database so that any malacious attacks could save the user authentication
            await userModel.create({
                username: username,
                email: email,
                password: hashpassword,
            }).then(res.render("login"))

        } else {
            res.json({ message: "invalid data" })

        }
    })


    //login route

router.get("/login", (req, res) => {
    res.render("login")
})
router.post("/login",
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send("invalid username or password")
        }

        const { username, password } = req.body;
        const user = await userModel.findOne({
            username: username,
        })
        if (!user) {
            return res.status(400).json({ message: "username or password incorrect" })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json({ message: "invalid username or password" })
        }
         else{
            const token = JWT.sign( 
                { id: user._id }
                , process.env.JWT_SECRET)
    
            res.cookie("token", token)
            res.render("home")
         }
        
    })

module.exports = router