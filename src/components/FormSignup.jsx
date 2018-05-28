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
      name: null,
      email: null,
      password: null,
      successMsg: false,
      errorMsg: false
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
    this.resetForm = this.resetForm.bind( this )
    this.render = this.render.bind( this )
  }

  handleFormGroupChange( e ) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState( {
      [name]: value
    })
  }

  resetForm() {
    this.setState({
      name: null,
      email: null,
      password: null
    })
  }

  handleSubmit( e ) {
    e.preventDefault()

    axios.post( 'http://localhost:3001/api/users', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        signUpDate: Date.now()
      })
      .then( res => {
        this.resetForm()
        this.setState( { successMsg: true } )
      })
      .catch( error => {
        this.setState( { errorMsg: true } )
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
      alertContent = 'Success! You are registered.'
    }

    if ( this.state.errorMsg ) {
      alertType = 'error'
      alertContent = 'Something went wrong :(. Try again.'
    }

    return(
      <FormWrapper
        handleSubmit={ this.handleSubmit }
        hasAlert={ this.state.hasAlert }
        alertType={ this.state.alertType }
        alertContent={ this.state.alertContent }
      >
        <FormGroup
          label='Name'
          type='text'
          id='name'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.name }
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