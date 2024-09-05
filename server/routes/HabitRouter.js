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
            creationDate: startDate,
            userId: id,
        })
        res.json({
            message: "Habit Created Succesfully"
        })
    } catch (error) {
        res.status(500).json({error: "Failed To Create Habit"})
    }
})
// fetch all habits
router.get("/", validateToken, async (req, res) => {
    try {
        const habits = await Habit.findAll({
            where: {userId: req.user.id}
        })
        if (!habits) {
            return res.status(404).json({error: "No Existing Habits"})
        }
        res.json(habits)
    } catch (error) {
        res.status(500).json({error: "An Error Occured Fetching Habits"})
    }
})

// fetch single habit
router.get("/:id", validateToken, async (req, res) => {
    try {
        const habitId = req.params.id
        const userId = req.user.id
        const singleHabit = await Habit.findOne({
            where: {userId: userId, id: habitId}
        })
        res.json(singleHabit)
    } catch (error) {
        res.status(500).json({error: "An Error Occured Fetching Habit"})
    }
})

// delete habit
router.delete("/:id", validateToken, async (req, res) => {
    try {
        const habitId = req.params.id
        const habitToDelete = await Habit.findOne({
            where: {id: habitId}
        })
        await Habit.destroy({
            where: {id: habitToDelete.id}
        })
        res.json("Habit Succesfully Deleted")
    } catch (error) {
        res.status(500).json({error: "An Error Occured Deleting Habit"})
    }
})


module.exports = router