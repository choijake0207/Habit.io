import React from 'react'
import { CaretCircleLeft} from "phosphor-react"
import { useNavigate } from 'react-router-dom'

export default function PrivatePageWrap({children, type}) {
  const navigate = useNavigate()
  return (
    <div className="private-page-wrap">
        <header className="page-header">
            {type === "single" ? 
              <button onClick={() => navigate("/home")}>
                <CaretCircleLeft className="back-nav-btn"/>
              </button>
            : <h1>{type}</h1>
            }
        </header>
        {children}
    </div>
  )
}
