import React from 'react'

import Content from '../components/Content.jsx'
import Heading from '../components/Heading.jsx'

class LoginPage extends React.Component {
  render() {
    return (
      <Content>
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