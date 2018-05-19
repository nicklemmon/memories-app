import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import FormWrapper from '../components/FormWrapper.jsx'
import FormGroup from '../components/FormGroup.jsx'
import ButtonWrapper from '../components/ButtonWrapper.jsx'
import Button from '../components/Button.jsx'

class LoginPage extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      hasAlert: false,
      alertType: null,
      alertContent: null
    }
  }

  render() {
    return (
      <div>
        <PageHeading content='Log In'/>

        <Content>
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
        </Content>
      </div>
    )
  }
}

export default LoginPage