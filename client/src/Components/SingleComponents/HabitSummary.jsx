import React, {useState} from 'react'
import Timer from "../Timer/Timer"
import {DotsThreeCircle} from "phosphor-react"


export default function HabitSummary({habit}) {
  const [time, date] =habit.creationDate.split("-")
  const [timeSetting, setTimeSetting] = useState("Hours")
  const timeSettings = ["Hours", "Days", "Weeks", "Months", "Years"]
  const [modalOn, setModalOn] = useState(false)
  console.log(timeSetting)
  return (
    <section className={`habit-summary ${habit.color}`}>
        {modalOn && <OptionsModal/>}
        <header className="summary-header">
          <h1>{habit.name}</h1>
          <button className="habit-option-btn" onClick={() => setModalOn(!modalOn)}>
            <DotsThreeCircle size={"2em"}/>
          </button>
        </header>
        <h3>Current Streak</h3>
        <div className="timer-toolbar">
          {timeSettings.map(type => {
            return (
              <button 
                key={type}
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
            type={timeSetting}
            status={habit.status}
            pauseDuration={habit.pauseDuration}
            pauseDate={habit.pauseDate}
        />
        <p>Started on {date}</p>
    </section>
  )
}

export function OptionsModal()  {
  return (
    <div className="options-modal">
      <button>Edit</button>
      <button>Delete</button>
    </div>  
  )
}
