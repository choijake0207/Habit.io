import React, { useEffect } from 'react'
import "./alert.css"
import { X } from 'phosphor-react';

export default function Alert({message, type, onClose}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000);
        return () => clearTimeout(timer)
    }, [])
  return (
    <div className={`alert ${type}-alert`}>
        <p>{message}</p>
        <button onClick={onClose}><X/></button>
    </div>
  )
}
