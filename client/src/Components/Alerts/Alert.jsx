import React, { useEffect } from 'react'

export default function Alert({message, type, onClose}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000);
        return () => clearTimeout(timer)
    }, [onClose])
  return (
    <div className={`alert ${type}-alert`}>
        <p>{message}</p>
    </div>
  )
}
