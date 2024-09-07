import React,{useState} from 'react'
import "./HabitCard.css"
import Timer from '../Timer/Timer'
import {useNavigate} from "react-router-dom"

export default function HabitCard({habit}) {
 const [time, date] = habit.startDate.split("-")
 const navigate = useNavigate()
  
  return (
    <li className={`habit-card ${habit.color}`}
      onClick={() => navigate(`/habit/${habit.id}`)}
    >
        <h3>{habit.name}</h3>
        <p>Started on {date}</p>
        <Timer
            start={habit.startDate}
            type={"Hours"}
            status={habit.status}
            pauseDuration={habit.pauseDuration}
        />
    </li>
  )
}
