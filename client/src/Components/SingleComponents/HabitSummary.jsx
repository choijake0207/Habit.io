import React, {useState} from 'react'
import Timer from "../Timer/Timer"
export default function HabitSummary({habit}) {
  const [time, date] =habit.creationDate.split("-")
  const [timeSetting, setTimeSetting] = useState("Hours")
  const timeSettings = ["Hours", "Days", "Weeks", "Months", "Years"]
  console.log(timeSetting)
  return (
    <section className="habit-summary">
        <h1>{habit.name}</h1>
        <h3>Current Streak</h3>
        <div className="timer-toolbar">
          {timeSettings.map(type => {
            return (
              <button 
                onClick={() => setTimeSetting(type)}
                className={type === timeSetting && `active`}
              >
                {type}
              </button>
            )
          })}
        </div>
        <Timer
            start={habit.startDate}
        />
        <p>Started on {date}</p>
    </section>
  )
}
