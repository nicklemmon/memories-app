import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content'
import PageHeading from '../components/PageHeading'
import FormSignup from '../components/FormSignup'

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title='Sign Up'/>
        
        <PageHeading content='Sign Up'/>

        <Content>
          <FormSignup/>
        </Content>
      </div>
    )
  }
}

export default SignupPage
