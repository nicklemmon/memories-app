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
      alertContent: null,
      username: null,
      password: null
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
    this.resetForm = this.resetForm.bind( this )
  }

  handleFormGroupChange( e ) {
    const target = e.target
    const {
      value,
      name
    } = target;

    this.setState( {
      [name]: value
    })
  }

  resetForm() {
    this.setState({
      username: null,
      password: null
    })
  }

  handleSubmit( e ) {
    e.preventDefault()

    axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/login`,
      {
        params: {
          username: this.state.username,
          password: this.state.password
        },
        headers: {
          'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
          'X-Parse-REST-API-Key': process.env.REACT_APP_API_KEY,
          'X-Parse-Revocable-Session': 1
        }
      })
        .then( res => {
          this.resetForm()
          this.setState( { successMsg: true } )
        })
        .catch( error => {
          this.setState( { errorMsg: true } )

          console.log( error );
        })
  }

  render() {
    let hasAlert
    let alertType
    let alertContent

    if ( this.state.successMsg || this.state.errorMsg ) {
      hasAlert = true
    }

    if ( this.state.successMsg ) {
      alertType = 'success'
      alertContent = 'Success! You logged in.'
    }

    if ( this.state.errorMsg ) {
      alertType= 'error'
      alertContent = 'Invalid username or password.'
    }

    return (
      <FormWrapper
        hasAlert={ hasAlert }
        alertType={ alertType }
        alertContent={ alertContent }
      >
        <FormGroup
          label='Username'
          type='text'
          id='username'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.username }
        />

        <FormGroup
          label='Password'
          type='password'
          id='password'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.password }
        />

        <ButtonWrapper>
          <Button
            type='primary'
            content='Login'
            fullWidth='true'
            onClick={ this.handleSubmit }
          />
        </ButtonWrapper>
      </FormWrapper>
    )
  }
}

export default FormLogin
