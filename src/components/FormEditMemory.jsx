import React from 'react'

import FormWrapper from './FormWrapper'
import FormGroup from './FormGroup'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'

class FormEditMemory extends React.Component {
  render() {
    return (
      <FormWrapper>
        <FormGroup
          label='Title'
          type='text'
          id='title'
        />

        <FormGroup
          label='Memory Date'
          type='data'
          id='data'
        />

        <FormGroup
          label='Summary'
          type='textarea'
          id='summary'
        />

        <ButtonWrapper>
          <Button
            type='primary'
            content='Submit'
          />
          
          <Button
            type='secondary'
            content='Cancel'
          />
        </ButtonWrapper>
      </FormWrapper>
    )
  }
}

export default FormEditMemory
