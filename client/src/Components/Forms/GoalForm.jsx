import React, {useState} from 'react'

export default function GoalForm({onClose}) {

    const [goalOption, setGoalOption] = useState("date")

  return (
    <div className="form-overlay">
        <form className="goal-form">
            <h1>Create A Goal</h1>
            <div className="goal-option-bar">
                <button type="button" onClick={() => setGoalOption("date")}>Choose A Date</button>
                <button type="button" onClick={() => setGoalOption("duration")}>Choose A Duration</button>
            </div>
            {
                goalOption === "date" ? 
                <div className="goal goal-date">
                    <label>Choose A Date:</label>
                    <input
                        type="date"
                    />
                </div>
                : <div className="goal goal-duration">
                    <label>Choose A Duration:</label>
                    <input type="number"/>
                </div>
            }
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    </div>
  )
}
