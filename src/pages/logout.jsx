import React from 'react'
import Helmet from 'react-helmet'

import Content from '../Content'
import Heading from '../Heading'

class LoginPage extends React.Component {
  render() {
    return (
      <Content>
        <Helmet title='Log Out'/>
        
        <Heading
          level='1'
          content='Log Out'
          alignment='center'
        />
      </Content>
    )
  }
}

export default LoginPage
