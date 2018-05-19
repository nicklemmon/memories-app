import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <DefaultLayout>
        </DefaultLayout>
      </Router>
    )
  }
}

export default App;
