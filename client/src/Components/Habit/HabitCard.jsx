import React,{useState} from 'react'
import "./HabitCard.css"
import Timer from '../Timer/Timer'

export default function HabitCard({habit}) {
 const [time, date] = habit.startDate.split("-")
  
  return (
    <li className="habit-card">
        <h3>{habit.name}</h3>
        <p>Started on {date}</p>
        <Timer
            start={habit.startDate}
        />
    </li>
  )
}
