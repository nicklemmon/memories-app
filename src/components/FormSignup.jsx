import React from 'react'
import axios from 'axios'

import FormWrapper from './FormWrapper.jsx'
import FormGroup from './FormGroup.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Button from './Button.jsx'

class FormSignup extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      hasAlert: false,
      alertType: null,
      alertContent: null
    }
  }

  render() {
    return(
      <FormWrapper
        hasAlert={ this.state.hasAlert }
        alertType={ this.state.alertType }
        alertContent={ this.state.alertContent }
      >
        <FormGroup
          label='Name'
          type='text'
          id='name'
        />

        <FormGroup
          label='Email'
          type='email'
          id='username'
        />

        <FormGroup
          label='Password'
          type='password'
          id='password'
        />

        <ButtonWrapper>
          <Button
            type='primary'
            content='Sign Up!'
          />

          <Button
            type='secondary'
            content='Cancel'
            linkTo='/'
          />
        </ButtonWrapper>
      </FormWrapper>
    )
  }
}

export default FormSignup