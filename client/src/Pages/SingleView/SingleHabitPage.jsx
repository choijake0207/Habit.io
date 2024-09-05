import React, { useState, useEffect } from 'react'
import {fetchSingleHabit} from "../../API/HabitAPI"
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./SingleHabitPage.css"
import { useParams } from 'react-router-dom'
import HabitStats from '../../Components/SingleComponents/HabitStats'
import HabitSummary from '../../Components/SingleComponents/HabitSummary'
import HabitButtons from '../../Components/SingleComponents/HabitButtons'

export default function SingleHabitPage() {
  const {id} = useParams()
  const [habit, setHabit] = useState()
  const [loading, setLoading] = useState(true)

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

  return (
    <PrivatePageWrap type={"single"}>
      {!loading && <div className="page" id="single-habit-page">
        <HabitSummary habit={habit}/>
        <HabitButtons habit={habit}/>
        <HabitStats habit={habit}/>
      
      </div>}
    </PrivatePageWrap>
  )
}
