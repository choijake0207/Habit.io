const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middleware/AuthMiddleware")

// persistent auth check
router.get("/auth",validateToken, async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.user.id}, attributes: ["email", "id"]})
        res.json(user)
    } catch (error) {
        res.status(500).json({error: "Failed To Authorize User"})
    }
} )
// register 
router.post("/register", async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    try {
        // check for existing email
        const existingEmail = await User.findOne({where: {email: email}})
        if (existingEmail) {
            return res.status(400).json({error: "Email Already Exists"})
        }
        const hash = await bcrypt.hash(password,10)
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        })
        const accessToken = sign({
            email: newUser.email,
            id: newUser.id
        }, "supersecretkey")
        res.json({
            accessToken: accessToken,
            email: newUser.email,
            id: newUser.id
        })
    } catch (error) {
        res.status(500).json({error: "Registration Failed"})
    }
})
// login
router.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            return res.status(404).json({error: "User Not Found"})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({error: "Incorrect email or password"})
        }
        const accessToken = sign({
            email: user.email, 
            id: user.id,
        }, "supersecretkey")
        res.json({
            accessToken: accessToken,
            email: user.email,
            id: user.id
        })
    } catch (error) {
        res.status(500).json({error: "An error occured trying to login"})
    }
})
// fetch profile info
router.get("/profile", validateToken, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {email: req.user.email},
            attributes: ["firstName", "lastName", "email", "id", "createdAt"]
        })
        if (!user) {
            return res.status(404).json({error: "User Does Not Exist"})
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({error: "An Error Occured Trying To Fetch Profile"})
    }
})


module.exports = router