import React,{useState} from 'react'
import "./HabitCard.css"
import Timer from '../Timer/Timer'
import {useNavigate} from "react-router-dom"

export default function HabitCard({habit, forDisplay, color}) {

    const [time, date] = forDisplay ? new Date().toLocaleTimeString().split("-") : habit.startDate.split("-")
    const navigate = useNavigate()


  
  return (
    <li className={`habit-card ${forDisplay ? color : habit.color}`}
      onClick={forDisplay ? null : () => navigate(`/habit/${habit.id}`)}
    >
        <h3>{forDisplay ? "New Habit" : habit.name}</h3>
        <p>Started on {date}</p>
        {forDisplay ? 
          <h4>0 Hours 0 Minutes</h4>
        
        : <Timer
            start={habit.startDate}
            type={"Hours"}
            status={habit.status}
            pauseDuration={habit.pauseDuration}
            pauseDate={habit.pauseDate}
          />
        }

    </li>
  )
}
