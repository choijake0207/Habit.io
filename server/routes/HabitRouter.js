const express = require("express")
const router = express.Router()
const {Habit} = require("../models")
const {validateToken} = require("../middleware/AuthMiddleware")


// post habit
router.post("/", validateToken, async (req, res) => {
    try {
        const {name, startDate, color} = req.body
        const id = req.user.id
        const newHabit = await Habit.create({
            name: name,
            startDate: startDate,
            color: color, 
            creationDate: startDate,
            userId: id,
            
        })
        res.json({
            message: "Habit Succesfully Created",
            id: newHabit.id
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
router.delete("/delete/:id", validateToken, async (req, res) => {
    try {
        const habitId = req.params.id
        const userId = req.user.id
        const habitToDelete = await Habit.findOne({
            where: {
                userId: userId, 
                id: habitId
            }
        })
        await Habit.destroy({
            where: {id: habitToDelete.id}
        })
        res.json("Habit Succesfully Deleted")
    } catch (error) {
        res.status(500).json({error: "An Error Occured Deleting Habit"})
    }
})

// reset timer 
router.put("/reset/:id", validateToken, async (req, res) => {
    const habitId = req.params.id
    const userId = req.user.id
    try {
        const habit = await Habit.findOne({
            where: {
                id: habitId,
                userId: userId
            }
        })
        if (!habit) { return res.status(404).json({error: "Habit Can Not Be Found"})}
        const endDate = new Date()
        const [time, date] = habit.startDate.split("-")
        const startDate = new Date(`${date} ${time}`)
        const totalDuration = endDate - startDate
        const streakDuration = totalDuration - habit.pauseDuration
        const newStreak = {
            duration: streakDuration,
            startDate: habit.startDate,
            endDate: `${endDate.toLocaleTimeString()}-${endDate.toLocaleDateString()}`
        }
        const updatedStreaks = [...habit.streaks, newStreak]
        habit.streaks = updatedStreaks
        habit.startDate = `${endDate.toLocaleTimeString()}-${endDate.toLocaleDateString()}`
        habit.endDate = null
        habit.pauseDuration = 0
        habit.status = "ongoing"
        await habit.save()
        res.json({
            message: "Habit Succesfully Restarted",
            habit: habit
        })
    } catch (error) {
        res.status(500).json({error: "Failed To Restart Habit"})
    }
})

// pause timer
router.put("/pause/:id", validateToken, async (req, res) => {
    const habitId = req.params.id
    const userId = req.user.id
    try {
        const habit = await Habit.findOne({
            where: {
                id: habitId,
                userId: userId
            }
        })
        if (!habit) {return res.status(404).json({error: "Habit Can Not Be Found"})}
        if (habit.status === "paused") { 
            const now = new Date()
            const [time, date] = habit.pauseDate.split("-")
            const pauseDate = new Date(`${date} ${time}`)
            const timePassed = now - pauseDate
            habit.status = "ongoing"
            habit.pauseDuration += timePassed
            await habit.save()
            res.json({
                message: "Habit Resumed Succesfully",
                habit: habit
            })
        } else {
            habit.status = "paused"
            const pauseDate = new Date()
            habit.pauseDate = `${pauseDate.toLocaleTimeString()}-${pauseDate.toLocaleDateString()}`
            await habit.save()
            res.json({
                message: "Habit Paused Successfully",
                habit: habit
            })
        }
    } catch (error) {
        res.status(500).json({error: "Failed To Pause/Resume Habit"})
    }
})

// create goal
router.post("/goal/:id", validateToken, async (req, res) => {
    const habitId = req.params.id
    const userId = req.user.id
    const {goal} = req.body
  
    try {
        const habit = await Habit.findOne({
            where: {
                id: habitId,
                userId: userId
            }
        })
        if (!habit) {
            return res.status(404).json({error: "Habit Can Not Be Found"})
        }
        const newGoal = {
            type: goal.type,
            target: goal.value,
            completed: false
        }
        habit.currentGoal = newGoal
        await habit.save()
        res.json({
            message: "Goal Created Succesfully",
            goal: newGoal
        })
    } catch (error) {
        res.status(500).json({error: "Failed To Create Goal"})
    }
})


module.exports = router