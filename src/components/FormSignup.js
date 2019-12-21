import React from 'react'
import Parse from 'parse'

import FormWrapper from './FormWrapper'
import FormGroup from './FormGroup'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'

class FormSignup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasAlert: false,
      alertType: null,
      alertContent: null,
      username: null,
      email: null,
      password: null,
      successMsg: false,
      errorMsg: false,
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  handleFormGroupChange(e) {
    const target = e.target
    const { value, name } = target

    this.setState({
      [name]: value,
    })
  }

  resetForm() {
    this.setState({
      username: null,
      email: null,
      password: null,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const user = new Parse.User()

    user.set('username', this.state.username)
    user.set('email', this.state.email)
    user.set('password', this.state.password)

    user
      .signUp()
      .then(user => {
        this.resetForm()
        this.setState({ successMsg: true })
      })
      .catch(error => {
        this.setState({ errorMsg: true })
      })
  }

  render() {
    let hasAlert
    let alertType
    let alertContent

    if (this.state.successMsg || this.state.errorMsg) {
      hasAlert = true
    }

    if (this.state.successMsg) {
      alertType = 'success'
      alertContent = 'Success! User added.'
    }

    if (this.state.errorMsg) {
      alertType = 'error'
      alertContent = 'Whoops! Something went wrong when signing up. Try again.'
    }

    return (
      <FormWrapper
        handleSubmit={this.handleSubmit}
        hasAlert={hasAlert}
        alertType={alertType}
        alertContent={alertContent}
      >
        <FormGroup
          label="Username"
          type="text"
          id="username"
          cy="form-group-username"
          handleChange={this.handleFormGroupChange}
          value={this.state.username}
        />

        <FormGroup
          label="Email"
          type="email"
          id="email"
          cy="form-group-email"
          handleChange={this.handleFormGroupChange}
          value={this.state.email}
        />

        <FormGroup
          label="Password"
          type="password"
          id="password"
          cy="form-group-password"
          handleChange={this.handleFormGroupChange}
          value={this.state.password}
        />

        <ButtonWrapper>
          <Button
            type="primary"
            content="Sign Up!"
            cy="button-sign-up"
            onClick={this.handleFormSubmit}
          >
            Sign Up!
          </Button>

          <Button type="secondary" content="Cancel" cy="button-cancel" linkTo="/">
            Cancel
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    )
  }
}

export default FormSignup
