import React from 'react'
import FocusLock from 'react-focus-lock'
import Loading from '../Loading'
import './PageLoader.css'

export default function PageLoader() {
  return (
    <FocusLock>
      <div className="PageLoader" tabIndex="-1" role="alert" autoFocus>
        <Loading className="PageLoader-loading" description="Loading..." />
      </div>
    </FocusLock>
  )
}
