import React, { useEffect, useState } from 'react'
import "./Timer.css"

export default function Timer({start}) {
    const [lapse, setLapse] = useState(0)
    useEffect(() => {
        const [time, date] = start.split("-")
        const formattedStart = new Date(`${date} ${time}`)
        const interval = setInterval(() => {
            const now = new Date()
            setLapse(now - formattedStart)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [start])
    const seconds = Math.floor((lapse / 1000) % 60);
    const minutes = Math.floor((lapse / 1000 / 60) % 60);
    const hours = Math.floor((lapse / (1000 * 60 * 60)) % 24);
    const days = Math.floor((lapse / (1000 * 60 * 60 * 24)) % 7);
    const weeks = Math.floor(lapse / (1000 * 60 * 60 * 24 * 7));
  return (
    <div className="timer">
        <h4 className="timer-count">
            {weeks}W {days}D {hours}H {minutes}M {seconds}s
        </h4>
    </div>
  )
}
