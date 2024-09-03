import React from 'react'

export default function PrivatePageWrap({children, type}) {
  return (
    <div className="private-page-wrap">
        <header>
            <h1>{type}</h1>
        </header>
        {children}
    </div>
  )
}
