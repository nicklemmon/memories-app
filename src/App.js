import React from 'react'
import Parse from 'parse'
import Helmet from 'react-helmet'
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'

class App extends React.Component {
  constructor( props ) {
    super( props )
    
    Parse.initialize(
      process.env.REACT_APP_APPLICATION_ID,
      process.env.REACT_APP_API_KEY,
      process.env.REACT_APP_MASTER_KEY
    )
    Parse.serverURL = process.env.REACT_APP_API_BASE_URL
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          defaultTitle='Memories App'
          titleTemplate='%s | Memories App'
        />
        
        <Router>
          <DefaultLayout/>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
