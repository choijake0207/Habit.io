const express = require("express")
const router = express.Router()
const {Habit} = require("../models")
const {validateToken} = require("../middleware/AuthMiddleware")


// post habit
router.post("/", validateToken, async (req, res) => {
    try {
        const {name, startDate} = req.body
        const id = req.user.id
        const newHabit = await Habit.create({
            name: name,
            startDate: startDate,
            userId: id,
        })
        res.json({
            message: "Habit Created Succesfully"
        })
    } catch (error) {
        res.status(500).json({error: "Failed To Create Habit"})
    }
})


module.exports = router