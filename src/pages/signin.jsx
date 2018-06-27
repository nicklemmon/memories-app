import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import FormSignin from '../components/FormSignin'

class SigninPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Sign In'/>

        <Content>
          <FormSignin/>
        </Content>
      </div>
    )
  }
}

export default SigninPage