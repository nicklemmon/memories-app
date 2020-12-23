import React from 'react'
import './Tag.css'

export function Tag(props) {
  return (
    <span className="Tag" role="button">
      {props.content}
    </span>
  )
}
