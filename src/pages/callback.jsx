import React from 'react'

import Loading from '../components/Loading.jsx'

import Auth from '../functions/Auth.js'

class CallbackPage extends React.Component {
  componentDidMount() {
    const auth = new Auth();

    auth.handleAuthentication();
  }

  render() {
    return <Loading />
  }
}

export default CallbackPage