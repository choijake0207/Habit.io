import React from 'react'
import Timer from "../Timer/Timer"
export default function HabitSummary({habit}) {
  return (
    <section className="habit-summary">
        <h1>{habit.name}</h1>
        <h2>Current Streak</h2>
        <div className="summary-timer">
        <Timer
            start={habit.startDate}
        />
        </div>
        <p>{habit.startDate}</p>
    </section>
  )
}
