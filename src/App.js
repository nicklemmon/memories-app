import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <DefaultLayout { ...this.props }/>
      </Router>
    )
  }
}

export default App;
