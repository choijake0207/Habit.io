import React,{useState} from 'react'
import "./HabitCard.css"
import Timer from '../Timer/Timer'
import {useNavigate} from "react-router-dom"
import Progress from '../Progress/Progress'
import {Pause} from "phosphor-react"

export default function HabitCard({habit, forDisplay, color, inputName}) {

    const [time, date] = forDisplay ? new Date().toLocaleTimeString().split("-") : habit.startDate.split("-")
    const navigate = useNavigate()


  
  return (
    <li className={`habit-card ${forDisplay ? color : habit.color} ${habit.status === "paused" && "paused"}`}
      onClick={forDisplay ? null : () => navigate(`/habit/${habit.id}`)}
    >
        {habit.status === "paused" && <div className="paused-screen"><Pause size="3em" weight="fill"/></div>}
        <h3>{forDisplay ? inputName : habit.name}</h3>
        <p>Started on {date}</p>
        {forDisplay ? 
          <h4>0 Hours 0 Minutes</h4>
        
        : 
          <>
            <Timer
              start={habit.startDate}
              type={"Days"}
              status={habit.status}
              pauseDuration={habit.pauseDuration}
              pauseDate={habit.pauseDate}
            />
            {habit.currentGoal && <Progress goal={habit.currentGoal} type={"card"} habit={habit}/>}
          </>
        }

    </li>
  )
}
