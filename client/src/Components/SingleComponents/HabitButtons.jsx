import React from 'react'
import { Pause, ArrowCounterClockwise, Target, Play, X } from 'phosphor-react'

export default function HabitButtons({onReset, status, currentGoal, onPause, toggleFormVisibility, onCancel}) {
  return (
    <section className="habit-buttons">
        <button className={status === "paused" ? "paused-pause-btn" : "pause-btn"} onClick={onPause}>
            {status === "paused" ? <Play weight="fill"/> : <Pause weight="fill"/>}
            {status === "paused" ? "Resume" : "Pause"}
        </button>
        <button className="reset-btn" onClick={onReset}>
            <ArrowCounterClockwise/>
            Reset
        </button>
        <button className={currentGoal ? "end goal-btn" : "create goal-btn"} onClick={currentGoal ? onCancel :toggleFormVisibility}>
            {currentGoal ? <X/> : <Target/>}
            {currentGoal ? "Cancel Goal" : "Set Goal"}
        </button>
    </section>
  )
}
