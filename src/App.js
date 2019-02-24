import React from 'react'
import Parse from 'parse'
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout.jsx'


class App extends React.Component {
  constructor( props ) {
    super( props )
    
    Parse.initialize( process.env.REACT_APP_APPLICATION_ID, process.env.REACT_APP_API_KEY )
    Parse.serverURL = process.env.REACT_APP_API_BASE_URL
  }

  render() {
    return (
      <Router>
        <DefaultLayout/>
      </Router>
    )
  }
}

export default App;
