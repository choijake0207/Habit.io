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

router.get("/", validateToken, async (req, res) => {
    try {
        const habits = await Habit.findAll({
            where: {id: req.user.id}
        })
        if (!habits) {
            return res.status(404).json({error: "No Existing Habits"})
        }
        res.json(habits)
    } catch (error) {
        res.status(500).json({error: "An Error Occured Fetching Habits"})
    }
})


module.exports = router