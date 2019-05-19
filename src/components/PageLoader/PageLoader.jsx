import React from 'react'
import { observer, inject } from 'mobx-react'

class PageLoader extends React.Component {
  render() {
    return (
      <div className="PageLoader">
        { this.props.appStore.isLoading && <div>🏋️ LOADING!! 🏋️</div> }
      </div>
    )
  }
}

export default inject( 'appStore' )( observer( PageLoader ) );
