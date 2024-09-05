import React from 'react'
import { ChartBar } from 'phosphor-react'

export default function HabitStats({habit}) {
  return (
    <section className="habit-stats">
        <header className="stats-header">
            <ChartBar size="2em"/>
            <h2>Stats</h2>
        </header>
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
