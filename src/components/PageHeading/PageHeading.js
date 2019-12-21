import React, { useRef, useEffect } from 'react'
import Heading from '../Heading'
import backgroundImage from '../../images/blanket.png'
import './PageHeading.css'

export default function PageHeading(props) {
  const el = useRef(null)
  const { children, cy } = props

  useEffect(() => {
    if (el) el.current.focus()
  }, [])

  return (
    <div className="PageHeading" tabIndex="-1" ref={el} data-cy={cy}>
      <Heading className="PageHeading-heading" level="1" alignment="center">
        {children}
      </Heading>

      <img className="PageHeading-background" src={backgroundImage} alt="" aria-hidden="true" />
    </div>
  )
}
