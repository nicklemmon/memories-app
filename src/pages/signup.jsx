import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import FormSignup from '../components/FormSignup.jsx'

class SignupPage extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
      <div>
        <PageHeading content='Sign Up!'/>

        <Content>
          <FormSignup/>
        </Content>
      </div>
    )
  }
}

export default SignupPage