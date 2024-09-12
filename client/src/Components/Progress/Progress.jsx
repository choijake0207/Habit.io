import React, { useEffect, useState } from 'react'
import "./Progress.css"

export default function Progress({goal}) {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      let percentage = 0
      if (goal.type === "date") {
        const targetDate = new Date(goal.target)
        const totalDuration = targetDate - new Date(goal.start)
        const passedDuration = now - new Date(goal.start)
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
        const passedDuration = now - new Date(goal.start)
        percentage = (passedDuration / totalDuration) * 100
      }
      setProgress(Math.min(100, percentage))
    }

    const interval = setInterval(calculateProgress, 1000)
    return () => clearInterval(interval)
  }, [goal])

  console.log(progress)
  return (
    <div className="progress-tracker">
      <p>Goal Progress:</p>
      <div className="goal-width">
        <div className="goal-progress" style={{width: `${progress}%`}}></div>
      </div>
 
    </div>
  )
}
