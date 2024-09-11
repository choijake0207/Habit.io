import React from 'react'
import { Pause, ArrowCounterClockwise, Target, Play, Flag } from 'phosphor-react'

export default function HabitButtons({onReset, habit, onPause, toggleFormVisibility, onComplete}) {
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
        <button className={habit.currentGoal ? "end goal-btn" : "create goal-btn"} onClick={habit.currentGoal ? onComplete :toggleFormVisibility}>
            {habit.currentGoal ? <Flag/> : <Target/>}
            {habit.currentGoal ? "End Goal" : "Create Goal"}
        </button>
    </section>
  )
}
