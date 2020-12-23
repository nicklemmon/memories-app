import React from 'react'
import { Heading } from 'src/components'

export function CardHeading(props) {
  const { headingLevel, children } = props

  return (
    <Heading className="Card-heading" level={headingLevel}>
      {children}
    </Heading>
  )
}
