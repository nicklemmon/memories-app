import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout.jsx'
import { UserContext } from './components/UserContext.js'

class App extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      user: {
        username: null,
        firstName: null,
        lastName: null
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={ this.state.user }>
        <Router>
          <DefaultLayout { ...this.props }/>
        </Router>
      </UserContext.Provider>
    )
  }
}

export default App;
