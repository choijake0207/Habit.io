import React, { useEffect, useState } from 'react'
import "./Progress.css"



export default function Progress({goal, type, habit, handleGoalComplete}) {
 
  const [completed, setCompleted] = useState(false)
  const convertHabitToISO = (habitStart) => {
    const [time, date] = habitStart.split("-")
    const [month, day, year] = date.split("/")
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const parsedTime = new Date(`${formattedDate} ${time}`).toISOString();
    return parsedTime
  }


  const calculateProgress = () => {
    const now = new Date()
    let percentage = 0
    let passedDuration = 0
    let totalDuration = 0
    const habitStart = convertHabitToISO(habit.startDate)
    let start = goal.countStreak ? habitStart : goal.start
    if (goal.type === "date") {
      const targetDate = new Date(goal.target)
      totalDuration = targetDate - new Date(start)
      passedDuration = now - new Date(start) - habit.pauseDuration
      percentage = (passedDuration / totalDuration ) * 100
    } else if (goal.type === "duration") {
      const {length, unit} = goal.target
      const unitToms = {
        Minutes: 1000 * 60,
        Hours: 1000 * 60 * 60,
        Days: 1000 * 60 * 60 * 24,
        Weeks: 1000 * 60 * 60 * 24 * 7,
        Months: 1000 * 60 * 60 * 24 * 30,
        Years: 1000 * 60 * 60 * 24 * 365,
      }
      totalDuration = length * unitToms[unit]
      passedDuration = now - new Date(start) - habit.pauseDuration
      percentage = (passedDuration / totalDuration) * 100
    }
    return {passedDuration, totalDuration, percentage: Math.min(100, percentage)}; 
  }

  const [{passedDuration, totalDuration, percentage}, setProgress] = useState(() => calculateProgress())
  useEffect(() => {
    if (habit.status === "paused") {return}
    const interval = setInterval(() => {
      const {passedDuration, totalDuration, percentage} = calculateProgress()
      setProgress({passedDuration, totalDuration, percentage})
      if (passedDuration >= totalDuration) {
        type !== "card" && handleGoalComplete()
        setCompleted(true)
      }
    }, 1000)
    return (() => clearInterval(interval))
  }, [habit.startDate, goal, habit.pauseDuration, habit.status])


  const roundedProgress = Math.round(percentage)
  return (
    <div className={type === "card" ? "card progress-tracker" : "progress-tracker"}>
      <div className="goal-width">
        <div className="goal-progress" style={{width: `${percentage}%`}}></div>
      </div>
      {completed ? <p>Goal Completed</p> : <p>Progress: {roundedProgress}%</p>}
    </div>
  )
}
