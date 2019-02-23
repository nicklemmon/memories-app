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
      alertContent: null,
      username: null,
      email: null,
      password: null,
      successMsg: false,
      errorMsg: false
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
      email: null,
      password: null
    })
  }

  handleSubmit( e ) {
    e.preventDefault()

    axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/users`,
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      },
      {
        headers: {
          'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
          'X-Parse-REST-API-Key': process.env.REACT_APP_API_KEY,
          'X-Parse-Revocable-Session': '1',
          'Content-Type': 'application/json'
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
      alertContent = 'Success! User added.'
    }

    if ( this.state.errorMsg ) {
      alertType = 'error'
      alertContent = 'Whoops! Something went wrong when signing up. Try again.'
    }

    return(
      <FormWrapper
        handleSubmit={ this.handleSubmit }
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
          label='Email'
          type='email'
          id='email'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.email }
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
            content='Sign Up!'
            onClick={ this.handleFormSubmit }
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
