import React, { useState, useEffect, act } from 'react'
import {fetchSingleHabit} from "../../API/HabitAPI"
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./SingleHabitPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import HabitStats from '../../Components/SingleComponents/HabitStats'
import HabitSummary from '../../Components/SingleComponents/HabitSummary'
import HabitButtons from '../../Components/SingleComponents/HabitButtons'
import { resetHabit as resetAPI, pauseHabit as pauseAPI, deleteHabit as deleteAPI, createGoal as createGoalAPI, updateGoal as updateGoalAPI } from '../../API/HabitAPI'
import Alert from "../../Components/Alerts/Alert"
import GoalForm from '../../Components/Forms/GoalForm'

 
export default function SingleHabitPage() {
  const {id} = useParams()
  const [habit, setHabit] = useState()
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()
  const [formVisibility, setFormVisibility] = useState(false)
  const [processingReq, setProcessingReq] = useState(null)

  const showAlert = (message, type, action) => {
    setAlert({message, type, action})
  }

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await fetchSingleHabit(id)
        setHabit(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHabit()
  }, [])

  const resetHabit = async() => {
    try {
      const response = await resetAPI(id)
      setHabit(response.data.habit)
      if (habit.currentGoal && habit.currentGoal.countStreak) {
        showAlert("Habit and Goal Reset", "success", "reset")
      } else {
        showAlert("Habit Reset", "success", "reset")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const pauseHabit = async () => {
    try {
      const currentStatus = habit.status
      const response = await pauseAPI(id)
      setHabit(response.data.habit)
      if (currentStatus === "paused") {
        showAlert("Habit Resumed", "success", "resume")
      } else {
        showAlert("Habit Paused", "success", "pause")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await deleteAPI(id)
      console.log(response)
      navigate("/home")
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateGoal = async (goal) => {
    if (habit.status === "paused") {
      showAlert("Error: Goal Can't Be Started While Streak Is Paused", "failure", null)
      return
    }
    if (processingReq)  {
      showAlert("Error: Please Try Again In A Few Moments", "failure", null)
      return
    }
    try {
      const response = await createGoalAPI(id, goal)
      console.log(response.data)
      setHabit(response.data.habit)
      showAlert("Goal Created", "success")
    } catch (error) {
      console.log(error)
    }
  }

  const cancelGoal = async () => {
    setProcessingReq(true)
    try {
      const response = await updateGoalAPI(id, "cancel")
      console.log(response)
      setHabit(response.data.habit)
      showAlert("Goal Cancelled", "success")
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setProcessingReq(false)
      }, 10000)
    }
  }
  const handleGoalComplete = async () => {
    try {
      const response = await updateGoalAPI(id, "complete")
      console.log(response.data.habit)
      setHabit(response.data.habit)
      showAlert("Goal Completed", "success")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <PrivatePageWrap type={"single"}>
      {alert && <Alert message={alert.message} type={alert.type} action={alert.action} onClose={() => setAlert(null)}/>}
      {formVisibility && <GoalForm onClose={()=> setFormVisibility(false)} status={formVisibility}  createGoal={handleCreateGoal}/>}
      {!loading && <div className="page" id="single-habit-page">
        <HabitSummary habit={habit} handleDelete={handleDelete} handleGoalComplete={handleGoalComplete}/>
        <HabitButtons status={habit.status} currentGoal={habit.currentGoal} onReset={resetHabit} onPause={pauseHabit} toggleFormVisibility={() => setFormVisibility(true)} onCancel={cancelGoal}/>
        <HabitStats streaks={habit.streaks} creationDate={habit.creationDate}/>
      
      </div>}
    </PrivatePageWrap>
  )
}
