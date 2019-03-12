import React from 'react'
import Parse from 'parse'
import { Redirect } from 'react-router-dom'

import FormWrapper from './FormWrapper.jsx'
import FormGroup from './FormGroup'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'
import ActionLink from './ActionLink'

class FormLogin extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      hasAlert: false,
      alertType: null,
      alertContent: null,
      username: null,
      password: null,
      redirect: false
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
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

  signIn() {
    Parse.User.logIn( this.state.username, this.state.password )
      .then( user => {
        this.setState({ redirect: true })
      })
      .catch( error => {
        this.setState({ errorMsg: true })
      })
  }

  handleSubmit( e ) {
    e.preventDefault()

    this.signIn()
  }

  render() {
    const {
      errorMsg,
      redirect
    } = this.state

    let hasAlert
    let alertType
    let alertContent
    
    if ( errorMsg ) {
      hasAlert = true
      alertType= 'error'
      alertContent = 'Invalid username or password.'
    }

    return (
      <React.Fragment>
        { redirect &&
          <Redirect
            to={{
              pathname: '/',
              state: {
                hasSuccessMessage: true,
                userName: this.state.username
              }
            }}
          />
        }
        
        { !redirect && 
          <FormWrapper
            hasAlert={ hasAlert }
            alertType={ alertType }
            alertContent={ alertContent }
            footerContent={ <ActionLink cy='link-sign-up' style={{ 'float': 'right' }} to='/signup'>Sign Up</ActionLink> }
          >
            <FormGroup
              label='Username'
              type='text'
              id='username'
              cy='form-group-username'
              handleChange={ this.handleFormGroupChange }
              value={ this.state.username }
              />

            <FormGroup
              label='Password'
              type='password'
              id='password'
              cy='form-group-password'
              handleChange={ this.handleFormGroupChange }
              value={ this.state.password }
              />

            <ButtonWrapper>
              <Button
                type='primary'
                content='Log In'
                fullWidth='true'
                cy='button-log-in'
                onClick={ this.handleSubmit }
              />
            </ButtonWrapper>
          </FormWrapper>
        }
      </React.Fragment>
    )
  }
}

export default FormLogin
