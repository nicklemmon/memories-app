import React from 'react'

import PageHeading from '../components/PageHeading'
import Content from '../components/Content'
import FormLogin from '../components/FormLogin.jsx'

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading
          content='Log In'
          cy='heading-log-in'
        />

        <Content>
          <FormLogin/>
        </Content>
      </div>
    )
  }
}

export default LoginPage
