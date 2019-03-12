import React from 'react'

import Content from '../components/Content'
import PageHeading from '../components/PageHeading'
import FormSignup from '../components/FormSignup.jsx'

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Sign Up'/>

        <Content>
          <FormSignup/>
        </Content>
      </div>
    )
  }
}

export default SignupPage
