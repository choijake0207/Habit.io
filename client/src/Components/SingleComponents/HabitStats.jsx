import React from 'react'
import { ChartBar } from 'phosphor-react'

export default function HabitStats({streaks, creationDate}) {
    const findLongestStreak = (streaks) => {
        if (streaks.length === 0) return 0
        const longestStreak = Math.max(...streaks.map(streak => streak.duration))
        return longestStreak
    }
    const longestStreak = findLongestStreak(streaks)

    const findAverageStreak = (streaks) => {
        if (streaks.length < 2) return 0
        const totalDuration = streaks.reduce((total, streak) => total + streak.duration, 0)
        const averageDuration = totalDuration / streaks.length
        return averageDuration
    }
    const averageStreak = findAverageStreak(streaks)
    const streakFormatter = (duration) => {
        const minutes = Math.floor((duration/1000/60) % 60)
        const hours = Math.floor((duration/(1000*60*60)) % 24)
        const days = Math.floor(duration/(1000*60*60*24))

        return `${days}d ${hours}h ${minutes}m`
    }
    const findSinceCreation = (creationDate) => {
        const [time, date] = creationDate.split("-")
        const creation = new Date(`${date} ${time}`)
        const now = new Date()
        const lapse = now - creation
        return lapse
    }
    const sinceCreation = findSinceCreation(creationDate)




  return (
    <section className="habit-stats">
        <header className="stats-header">
            <ChartBar size="2em"/>
            <h2>Stats</h2>
        </header>
        <div className="stats-container">
        <div className="resets">
            <p>{streaks.length}</p>
            <label>Resets</label>
        </div>
        <div className="total-lapse">
            <p>{streakFormatter(sinceCreation)}</p>
            <label>Since Creation</label>
        </div>
        <div className="longest-streak">
            <p>{streakFormatter(longestStreak)}</p>
            <label>Longest Streak</label>
        </div>
        <div className="avg-streak">
            <p>{streakFormatter(averageStreak)}</p>
            <label>Average Streak</label>
        </div>
        </div>
    </section>
  )
}
