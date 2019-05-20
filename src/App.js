import React from 'react'
import Parse from 'parse'
import Helmet from 'react-helmet'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppStore from './stores/AppStore'

import DefaultLayout from './layouts/DefaultLayout.jsx'

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
          <Provider appStore={ AppStore }>
            <DefaultLayout/>
          </Provider>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
