import React from 'react'

import FormGroup from './FormGroup'

class FormGroupTagInput extends React.Component {
  render() {
    const { 
      index,
      handleChange,
      buttonOnClick,
      value
    } = this.props

    return (
      <FormGroup
        label={ `Tag ${index + 1}` }
        type='text'
        id={ `tag-${index}` }
        handleChange={ handleChange }
        buttonOnClick={ buttonOnClick }
        buttonContent='Delete'
        value={ value }
      />
    )
  }
}

export default FormGroupTagInput
