import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout.jsx'

class App extends React.Component {
  render() {
    console.log( 'props on the App!', this.props.auth )

    return (
      <Router>
        <DefaultLayout { ...this.props }/>
      </Router>
    )
  }
}

export default App;
