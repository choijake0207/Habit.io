import React from 'react'
import { Pause, ArrowCounterClockwise, Flag } from 'phosphor-react'

export default function HabitButtons({onReset, habit, onPause}) {
  return (
    <section className="habit-buttons">
        <button className="pause-btn" onClick={onPause}>
            <Pause/>
            Pause
        </button>
        <button className="reset-btn" onClick={onReset}>
            <ArrowCounterClockwise/>
            Reset
        </button>
        <button className="complete-btn">
            <Flag/>
            Mark Complete
        </button>
    </section>
  )
}
