import React from 'react'
import FocusLock from 'react-focus-lock'
import { Loading } from 'src/components'
import './PageLoader.css'

export function PageLoader() {
  return (
    <FocusLock>
      <div className="PageLoader" tabIndex="-1" role="alert" autoFocus>
        <Loading className="PageLoader-loading" description="Loading..." />
      </div>
    </FocusLock>
  )
}
