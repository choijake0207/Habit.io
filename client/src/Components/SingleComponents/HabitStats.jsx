import React from 'react'
import { ChartBar } from 'phosphor-react'

export default function HabitStats({habit}) {
    const findLongestStreak = (streaks) => {
        if (streaks.length === 0) return 0
        const longestStreak = Math.max(...streaks.map(streak => streak.duration))
        return longestStreak
    }
    const longestStreak = findLongestStreak(habit.streaks)

    const streakFormatter = (duration) => {
        const minutes = Math.floor((duration/1000/60) % 60)
        const hours = Math.floor((duration/(1000*60*60)) % 24)
        const days = Math.floor(duration/(1000*60*60*24))

        return `${days}d ${hours}h ${minutes}m`
    }


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
            <p>{streakFormatter(longestStreak)}</p>
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
