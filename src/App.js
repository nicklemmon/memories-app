import React from 'react'
import Parse from 'parse';
import { BrowserRouter as Router } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout.jsx'

Parse.serverURL = process.env.REACT_APP_API_BASE_URL;
Parse.initialize(
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_API_KEY
);

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
