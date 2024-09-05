import React from 'react'

export default function HabitStats({habit}) {
  return (
    <section className="habit-stats">
        <h2>Stats</h2>
        <div className="stats-container">
        <div className="resets">
            <p>{habit.streaks.length}</p>
            <label>Resets</label>
        </div>
        <div className="total-lapse">
            <p>0</p>
            <label>Since Start</label>
        </div>
        <div className="longest-streak">
            <p>0</p>
            <label>Longest Streak</label>
        </div>
        <div className="avg-streak">
            <p>0</p>
            <label>Average Streak</label>
        </div>
        </div>
    </section>
  )
}
