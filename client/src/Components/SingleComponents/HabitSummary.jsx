import React, {useState} from 'react'
import Timer from "../Timer/Timer"
import {DotsThreeCircle} from "phosphor-react"
import { useParams } from 'react-router-dom'
import Progress from '../Progress/Progress'



export default function HabitSummary({habit, handleDelete, handleGoalComplete}) {
  const [sTime, sDate] = habit.startDate.split("-")
  const [timeSetting, setTimeSetting] = useState("Hours")
  const timeSettings = ["Hours", "Days", "Weeks", "Months", "Years"]
  const [modalOn, setModalOn] = useState(false)
  const {id} = useParams()


  

  return (
    <section className={`habit-summary ${habit.color}`}>
        {modalOn && <OptionsModal deleteHabit={handleDelete}/>}
        <header className="summary-header">
          <h1>{habit.name}</h1>
          <button className="habit-option-btn" onClick={() => setModalOn(!modalOn)}>
            <DotsThreeCircle size={"2em"}/>
          </button>
        </header>

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
        <p>Current Streak:</p>
        <Timer
            start={habit.startDate}
            type={timeSetting}
            status={habit.status}
            pauseDuration={habit.pauseDuration}
            pauseDate={habit.pauseDate}
        />
        {habit.currentGoal && <Progress goal={habit.currentGoal} habit={habit} handleGoalComplete={handleGoalComplete}/>}
        <p>Streak started on {sDate}</p>
        
    </section>
  )
}

export function OptionsModal({deleteHabit})  {
  return (
    <div className="options-modal">
      <button>Edit</button>
      <button onClick={deleteHabit}>Delete</button>
    </div>  
  )
}
