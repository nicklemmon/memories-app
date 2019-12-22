import React, { useState, useEffect } from 'react'
import posed from 'react-pose'
import FocusLock from 'react-focus-lock'
import './Modal.css'

export default function Modal(props) {
  const [isHidden, setIsHidden] = useState(true)
  const { id, heading, children } = props
  const PosedDiv = posed.div({
    visible: {
      translateX: '-50%',
      translateY: '-50%',
      opacity: 1,
    },
    hidden: {
      translateY: '-65%',
      translateX: '-50%',
      opacity: 0,
    },
  })

  useEffect(() => {
    setIsHidden(false)
  }, [])

  return (
    <PosedDiv
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
    </PosedDiv>
  )
}
