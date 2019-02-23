import React from 'react'

import PageHeading from '../components/PageHeading.jsx'
import Content from '../components/Content.jsx'
import Heading from '../components/Heading.jsx'
import FormLogin from '../components/FormLogin.jsx'

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Log In'/>

        <Content>
          <Heading
            level='2'
            content='Log In'
            alignment='center'
          />

          <FormLogin/>
        </Content>
      </div>
    )
  }
}

export default LoginPage
