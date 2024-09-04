import React, {useState} from 'react'
import "./Form.css"
import { createHabit } from '../../API/HabitAPI'

export default function HabitForm({toggleVisibility}) {
    const [name, setName] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const startDate = new Date()
        try {
        const response = await createHabit(name, startDate)
        console.log(response)
        setName("")
        toggleVisibility()
        } catch (error) {
            console.log(error)
        }
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
            <button type="submit">Create</button>
            <button type="button" onClick={toggleVisibility}>Cancel</button>
        </form>
    </div>
  )
}
