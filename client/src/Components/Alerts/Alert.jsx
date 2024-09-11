import React, { useEffect } from 'react'
import "./alert.css"
import { X, Pause, ArrowCounterClockwise, Target, Play } from 'phosphor-react';

export default function Alert({message, type, action, onClose}) {
    useEffect(() => {
        const timer = setTimeout(() => {
          document.getElementById("alert-box").classList.add("slide-out")
          setTimeout(() => {
            onClose()
          }, 100)
        }, 2000);
        return () => clearTimeout(timer)
    }, [])
  return (
    <div id="alert-box" className={`alert ${type} ${action}`}>
        {(() => {
          switch (action) {
            case "reset":
              return <div><ArrowCounterClockwise/><p>{message}</p></div>
            case "pause":
              return <div><Pause/><p>{message}</p></div>
            case "resume":
              return <div><Play/><p>{message}</p></div>
          }
        })()}
        <button onClick={onClose}><X weight="bold"/></button>
    </div>
  )
}
