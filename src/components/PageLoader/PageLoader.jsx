import React from 'react'

import Loading from '../Loading'

import './PageLoader.css'

class PageLoader extends React.Component {
  constructor( props ) {
    super( props )

    this.loader = React.createRef()
  }

  componentDidMount() {
    this.loader.current.focus()
  }

  render() {
    return (
      <div
        className="PageLoader" 
        tabIndex="-1"
        ref={ this.loader }
      >
        <Loading className="PageLoader-loading"/>
      </div>
    )
  }
}

export default PageLoader
