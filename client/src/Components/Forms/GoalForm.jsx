import React, {useState} from 'react'

export default function GoalForm({onClose, status, createGoal}) {

    const [goalOption, setGoalOption] = useState("date")
    const [goalDate, setGoalDate] = useState("")
    const [durationUnit, setDurationUnit] = useState("Days")
    const [goalDuration, setGoalDuration] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        let goal = {}
        if (goalOption === "date") {
            goal = {type: "date", value: goalDate}
        } else  {
            goal = {type: "duration", value: {length: goalDuration, unit: durationUnit }}
        }
        createGoal(goal)
        onClose()
    }
  return (
    <div className="form-overlay">
        <form className={status ? "pop-up goal-form": "goal-form"} onSubmit={handleSubmit}> 
            <div className="goal-option-bar">
                <label>Choose Goal Type:</label>
                <div className="option-bar-btn">
                    <button type="button" className={goalOption === "date" && "active"}onClick={() => setGoalOption("date")}>Date</button>
                    <button type="button" className={goalOption === "duration" && "active"} onClick={() => setGoalOption("duration")}>Duration</button>
                </div>
            </div>
            {
                goalOption === "date" ? 
                <div className="goal goal-date">
                    <label>Choose a Date:</label>
                    <input
                        type="date"
                        required
                        value={goalDate}
                        onChange={(e) => setGoalDate(e.target.value)}
                    />
                </div>
                : <div className="goal goal-duration">
                    <label>Choose a Duration:</label>
                    <div className="duration-container">
                        <input 
                            required 
                            type="number" 
                            step="1" 
                            min="1"
                            value={goalDuration}
                            onChange={(e) => setGoalDuration(e.target.value)}
                        />
                        <select required value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)}>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                            <option value="Weeks">Weeks</option>
                            <option value="Months">Months</option>
                            <option value="Years">Years</option>
                        </select>
                    </div>
                   
                </div>
            }
            <div className="optional-input">
                <label>Count Existing Streak Time:</label>
                <div className="custom-checkbox">
                    <input
                        type="checkbox"
                    />
                    <label></label>
                </div> 
            </div>
            <button type="submit" className="submit-btn">Create</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
    </div>
  )
}
