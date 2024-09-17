import React, { useEffect, useState } from 'react'
import "./Timer.css"

export default function Timer({start, type, status, pauseDuration, pauseDate}) {
    const [lapse, setLapse] = useState(() => {
        const [time, date] = start.split("-")
        const formattedStart = new Date(`${date} ${time}`)
        
        const now = new Date()
        if (status === "paused") {
            const [pTime, pDate] = pauseDate.split("-")
            const formattedPause = new Date(`${pDate} ${pTime}`)
            return formattedPause - formattedStart - pauseDuration
        }
        return now - formattedStart - pauseDuration
    })
    useEffect(() => {
        if (status === "paused") {return}
        const [time, date] = start.split("-")
        const formattedStart = new Date(`${date} ${time}`)
        const interval = setInterval(() => {
            const now = new Date()
            setLapse(now - formattedStart - pauseDuration)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [start,status, pauseDuration])
    const seconds = Math.floor((lapse / 1000) % 60)
    const minutes = Math.floor((lapse / 1000 / 60) % 60);
    const hours = Math.floor((lapse / (1000 * 60 * 60)));
    const moduloHours = Math.floor((lapse / (1000 * 60 * 60)) % 24);
    const days = Math.floor((lapse / (1000 * 60 * 60 * 24)));
    const moduloDays = Math.floor((lapse / (1000 * 60 * 60 * 24)) % 7);
    const weeks = Math.floor(lapse / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(lapse / (1000 * 60 * 60 * 24 * 30))
    const years = Math.floor(lapse / (1000 * 60 * 60 * 24 * 365))


  return (
    <div className="timer">
        {(() => {
            switch (type) {
                case "Hours":
                    return <h4>{hours} Hours {minutes} Minutes {seconds} Seconds</h4>
                case "Days":
                    return <h4>{days} Days {moduloHours} Hours {minutes} Minutes</h4>
                case "Weeks":
                    return <h4> {weeks} Weeks {moduloDays} Days {hours} Hours </h4>
                case "Months":
                    return <h4>{months} Months {weeks} Weeks {days} Days  </h4>
                case "Years":
                    return <h4>{years} Years {months} Months {weeks} Weeks</h4>  
            }
        })()}
    </div>
  )
}
