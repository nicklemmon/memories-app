import React from 'react'
import axios from 'axios'

import FormWrapper from './FormWrapper.jsx'
import FormGroup from './FormGroup.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Button from './Button.jsx'

class FormLogin extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      hasAlert: false,
      alertType: null,
      alertContent: null
    }
  }

  handleSubmit( e ) {
    e.preventDefault();
    
    console.log( 'submit!' )
  }

  render() {
    return (
      <FormWrapper
        hasAlert={ this.state.hasAlert }
        alertType={ this.state.alertType }
        alertContent={ this.state.alertContent }
      >
        <FormGroup
          label='Username'
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
            content='Login'
            fullWidth='true'
          />
        </ButtonWrapper>
      </FormWrapper>
    )
  }
}

export default FormLogin