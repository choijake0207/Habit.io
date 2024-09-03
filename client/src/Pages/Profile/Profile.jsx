import React, { useEffect, useState } from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./profile.css"
import { fetchProfile } from '../../API/UserAPI'

export default function Profile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfileRequest = async () => {
      try {
        const response = await fetchProfile()
        setProfile(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfileRequest()
  }, [])


  return (
    <PrivatePageWrap type={"Profile"}>
      <div className="page" id="profile-page">
        <h2>Your Information</h2>
        <section className="profile-info">
          Information
        </section>
        <h2>Settings</h2>
        <section className="profile-settings">
          Settings
        </section>
      </div>
    </PrivatePageWrap>
  )
}
