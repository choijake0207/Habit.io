import React from 'react'
import { Pause, ArrowCounterClockwise, Flag } from 'phosphor-react'

export default function HabitButtons({onReset, habit}) {
  return (
    <section className="habit-buttons">
        <button className="pause-btn">
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
