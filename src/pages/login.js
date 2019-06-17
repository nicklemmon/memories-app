import React from 'react'
import Helmet from 'react-helmet'

import PageHeading from '../components/PageHeading'
import Content from '../components/Content'
import FormLogin from '../components/FormLogin'

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title='Log In' />
        
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
