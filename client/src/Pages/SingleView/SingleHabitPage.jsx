import React, { useState, useEffect } from 'react'
import {fetchSingleHabit} from "../../API/HabitAPI"
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./SingleHabitPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import HabitStats from '../../Components/SingleComponents/HabitStats'
import HabitSummary from '../../Components/SingleComponents/HabitSummary'
import HabitButtons from '../../Components/SingleComponents/HabitButtons'
import { resetHabit as resetAPI, pauseHabit as pauseAPI, deleteHabit as deleteAPI } from '../../API/HabitAPI'
 
export default function SingleHabitPage() {
  const {id} = useParams()
  const [habit, setHabit] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
      console.log(response.data.habit)
    } catch (error) {
      console.log(error)
    }
  }

  const pauseHabit = async () => {
    try {
      const response = await pauseAPI(id)
      setHabit(response.data.habit)
      console.log(response.data.habit)
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
      {!loading && <div className="page" id="single-habit-page">
        <HabitSummary habit={habit} handleDelete={handleDelete}/>
        <HabitButtons habit={habit} onReset={resetHabit} onPause={pauseHabit}/>
        <HabitStats habit={habit}/>
      
      </div>}
    </PrivatePageWrap>
  )
}
