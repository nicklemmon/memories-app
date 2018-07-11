import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Auth from './functions/Auth.js'

import './index.css'

window.setState = function() {
  const auth = new Auth()

  const State = {
    auth
  }

  ReactDOM.render( <App { ...State } />, document.getElementById( 'root' ) )
}()


registerServiceWorker()
