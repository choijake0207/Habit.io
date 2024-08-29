import React from 'react'
import { Outlet } from 'react-router-dom'
import "./layout.css"

export default function RootLayout() {
  return (
    <div className="root-layout">
        <Outlet/>
    </div>
  )
}
