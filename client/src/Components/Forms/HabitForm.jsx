import React, {useState} from 'react'
import "./Form.css"
import HabitCard from "../Habit/HabitCard"

export default function HabitForm({ createHabit, onClose}) {
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
    }
  return (
    <div className="form-overlay">
        <form className="habit-form" onSubmit={handleSubmit}>
            <HabitCard forDisplay={true} color={color}/>
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
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    </div>
  )
}
