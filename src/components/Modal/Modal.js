import React from 'react'
import FocusLock from 'react-focus-lock'
import './Modal.css'

export default function Modal(props) {
  const { id, heading, children } = props

  return (
    <div
      className="Modal"
      id={id}
      aria-labelledby={`${id}-heading`}
      aria-modal="true"
      role="dialog"
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
