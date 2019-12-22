import React, { useState, useEffect } from 'react'
import FocusLock from 'react-focus-lock'
import './Modal.css'

export default function Modal(props) {
  const [isHidden, setIsHidden] = useState(true)
  const { id, heading, children } = props

  useEffect(() => {
    setIsHidden(false)
  }, [])

  return (
    <div
      className="Modal"
      id={id}
      aria-labelledby={`${id}-heading`}
      aria-modal="true"
      role="dialog"
      pose={isHidden ? 'hidden' : 'visible'}
    >
      <div>
        <FocusLock className="Modal-content">
          <div className="Modal-heading" id={`${id}-heading`} tabIndex="-1">
            {heading}
          </div>

          {children}
        </FocusLock>
      </div>
    </div>
  )
}
