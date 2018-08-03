import React from 'react'

import FormGroup from './FormGroup.jsx'

class FormGroupTagInput extends React.Component {
  render() {
    const {
      index,
      handleChange,
      value
    } = this.props;

    return (
      <FormGroup
        label={ `Tag ${index + 1}` }
        type='text'
        id={ `tag-${index}` }
        key={ `tag-${index}` }
        handleChange={ handleChange }
        value={ value }
      />
    )
  }
}

export default FormGroupTagInput