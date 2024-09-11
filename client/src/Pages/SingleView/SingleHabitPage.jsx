import React, { useState, useEffect } from 'react'
import {fetchSingleHabit} from "../../API/HabitAPI"
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./SingleHabitPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import HabitStats from '../../Components/SingleComponents/HabitStats'
import HabitSummary from '../../Components/SingleComponents/HabitSummary'
import HabitButtons from '../../Components/SingleComponents/HabitButtons'
import { resetHabit as resetAPI, pauseHabit as pauseAPI, deleteHabit as deleteAPI } from '../../API/HabitAPI'
import Alert from "../../Components/Alerts/Alert"
import GoalForm from '../../Components/Forms/GoalForm'
 
export default function SingleHabitPage() {
  const {id} = useParams()
  const [habit, setHabit] = useState()
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()
  const [formVisibility, setFormVisibility] = useState(false)

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
      showAlert("Habit Reset", "success", "reset")
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

  return (
    <PrivatePageWrap type={"single"}>
      {alert && <Alert message={alert.message} type={alert.type} action={alert.action} onClose={() => setAlert(null)}/>}
      {formVisibility && <GoalForm onClose={()=> setFormVisibility(false)} status={formVisibility}/>}
      {!loading && <div className="page" id="single-habit-page">
        <HabitSummary habit={habit} handleDelete={handleDelete}/>
        <HabitButtons habit={habit} onReset={resetHabit} onPause={pauseHabit} toggleFormVisibility={() => setFormVisibility(true)}/>
        <HabitStats habit={habit}/>
      
      </div>}
    </PrivatePageWrap>
  )
}
