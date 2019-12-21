import React from 'react'
import FormGroup from './FormGroup'

export default function FormGroupTagInput(props) {
  const { index, handleChange, buttonOnClick, value } = props

  return (
    <FormGroup
      label={`Tag ${index + 1}`}
      type="text"
      id={`tag-${index}`}
      handleChange={handleChange}
      buttonOnClick={buttonOnClick}
      buttonContent="Delete"
      value={value}
    />
  )
}
