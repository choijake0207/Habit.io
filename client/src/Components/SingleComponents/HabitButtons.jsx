import React from 'react'
import { Pause, ArrowCounterClockwise, Target, Play } from 'phosphor-react'

export default function HabitButtons({onReset, habit, onPause, toggleFormVisibility}) {
  return (
    <section className="habit-buttons">
        <button className={habit.status === "paused" ? "paused-pause-btn" : "pause-btn"} onClick={onPause}>
            {habit.status === "paused" ? <Play weight="fill"/> : <Pause weight="fill"/>}
            {habit.status === "paused" ? "Resume" : "Pause"}
        </button>
        <button className="reset-btn" onClick={onReset}>
            <ArrowCounterClockwise/>
            Reset
        </button>
        <button className="goal-btn" onClick={toggleFormVisibility}>
            <Target/>
            Create Goal
        </button>
    </section>
  )
}
