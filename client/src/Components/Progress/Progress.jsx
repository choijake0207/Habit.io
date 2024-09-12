import React, { useEffect, useState } from 'react'
import "./Progress.css"



export default function Progress({goal, type, habit}) {
  const [progress, setProgress] = useState(0)

  const convertHabitToISO = (habitStart) => {
    const [time, date] = habitStart.split("-")
    const [month, day, year] = date.split("/")
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const parsedTime = new Date(`${formattedDate} ${time}`).toISOString();
    return parsedTime
  }

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      let percentage = 0
      const habitStart = convertHabitToISO(habit.startDate)
      let start = goal.countStreak ? habitStart : goal.start
      if (goal.type === "date") {
        const targetDate = new Date(goal.target)
        const totalDuration = targetDate - new Date(start)
        const passedDuration = now - new Date(start)
        console.log(passedDuration)
        percentage = (passedDuration / totalDuration ) * 100
      } else if (goal.type === "duration") {
        const {length, unit} = goal.target
        const unitToms = {
          Hours: 1000 * 60 * 60,
          Days: 1000 * 60 * 60 * 24,
          Weeks: 1000 * 60 * 60 * 24 * 7,
          Months: 1000 * 60 * 60 * 24 * 30,
          Years: 1000 * 60 * 60 * 24 * 365,
        }
        const totalDuration = length * unitToms[unit]
        console.log(totalDuration)
        const passedDuration = now - new Date(start)
        console.log(passedDuration)
        percentage = (passedDuration / totalDuration) * 100
      }
      setProgress(Math.min(100, percentage))
    }

    const interval = setInterval(calculateProgress, 1000)
    return () => clearInterval(interval)
  }, [goal])


  const roundedProgress = Math.round(progress)
  return (
    <div className={type === "card" ? "card progress-tracker" : "progress-tracker"}>
      <div className="goal-width">
        <div className="goal-progress" style={{width: `${progress}%`}}></div>
      </div>
      <p>Progress: {roundedProgress}%</p>
    </div>
  )
}
