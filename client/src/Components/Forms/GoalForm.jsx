import React, {useState} from 'react'

export default function GoalForm({onClose, status}) {

    const [goalOption, setGoalOption] = useState("date")
    const [durationOption, setDurationOption] = useState(null)
    console.log(durationOption)
  return (
    <div className="form-overlay">
        <form className={status ? "pop-up goal-form": "goal-form"}> 
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
                    />
                </div>
                : <div className="goal goal-duration">
                    <label>Choose a Duration:</label>
                    <div className="duration-container">
                        <input required type="number" step="1" min="1"/>
                        <select required value={durationOption} onChange={(e) => setDurationOption(e.target.value)}>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                            <option value="Weeks">Weeks</option>
                            <option value="Months">Months</option>
                            <option value="Years">Years</option>
                        </select>
                    </div>
                   
                </div>
            }
            <button type="submit" className="submit-btn">Create</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
    </div>
  )
}
