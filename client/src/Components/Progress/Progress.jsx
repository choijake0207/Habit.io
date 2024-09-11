import React, { useEffect, useState } from 'react'
import "./Progress.css"

export default function Progress({goal}) {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      let percentage = 0
      if (goal.type === "date") {
        const targetDate = new Date(date.value)

      }

    }
  })


  return (
    <div className="progress-tracker">
      <p>Goal Progress:</p>
      <div className="goal-width">
        <div className="goal-progress"></div>
      </div>
 
    </div>
  )
}
