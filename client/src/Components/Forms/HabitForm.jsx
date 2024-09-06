import React, {useState} from 'react'
import "./Form.css"
import { createHabit } from '../../API/HabitAPI'

export default function HabitForm({toggleVisibility, createHabit}) {
    const colors = ["red", "blue", "green", "orange", "purple"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const [name, setName] = useState("")
    const [color, setColor] = useState(randomColor)
    console.log(color)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const now = new Date()
        const startDate = `${now.toLocaleTimeString()}-${now.toLocaleDateString()}`
        createHabit(name, startDate, color)
        setName("")
        toggleVisibility()
    }
  return (
    <div className="form-overlay">
        <form className="habit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Habit Name"
            />
            <label>Pick a color</label>
            <div className="color-selector">
                {colors.map(i => {
                    return (
                        <button 
                            type="button"
                            key={i}
                            className={`color-selector-btn ${i}`}
                            id={i === color && "selected"}
                            onClick={() => setColor(i)} 
                        ></button>
                    )   
                })}
            </div>
            <button type="submit">Create</button>
            <button type="button" onClick={toggleVisibility}>Cancel</button>
        </form>
    </div>
  )
}
