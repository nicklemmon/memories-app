import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import FormLogIn from '../components/FormLogIn.jsx'

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Log In'/>

        <Content>
          <FormLogIn/>
        </Content>
      </div>
    )
  }
}

export default LoginPage