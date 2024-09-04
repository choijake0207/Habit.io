import React, {useState} from 'react'

export default function HabitForm({createHabit}) {
    const [habitName, setHabitName] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        const now = new Date()
        const formattedDate = `${now.toLocaleTimeString()}-${now.toLocaleDateString()}`
        const newHabit = {
            name: habitName,
            startDate: formattedDate
        }
        createHabit(newHabit)
        setHabitName("")
    }
  return (
    <div className="form-overlay">
        <form className="habit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
                placeholder="Habit Name"
            />
            <button
                type="button"
            >
                Create
            </button>
        </form>
    </div>
  )
}
