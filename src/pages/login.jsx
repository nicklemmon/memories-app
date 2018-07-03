import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import FormLogin from '../components/FormLogin'

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Sign In'/>

        <Content>
          <FormLogin/>
        </Content>
      </div>
    )
  }
}

export default LoginPage