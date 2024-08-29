const express = require("express")
const router = express.Router()
const {User} = require("../models")
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")


// register 
router.post("/register", async (req, res) => {
    const {email, password} = req.body
    try {
        // check for existing email
        const existingEmail = await User.findOne({where: {email: email}})
        if (existingEmail) {
            return res.status(400).json({error: "Username Already Exists"})
        }
        const hash = await bcrypt.hash(password,10)
        const newUser = await User.create({
            email: email,
            password: hash
        })
        const accessToken = sign({
            email: newUser.email,
            id: newUser.id
        }, "supersecretkey")
        res.json({
            accessToken: accessToken
        })
    } catch (error) {
        res.status(500).json({error: "Registration Failed"})
    }
})
