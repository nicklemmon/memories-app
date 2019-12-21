import React from 'react'
import FocusLock from 'react-focus-lock'
import posed from 'react-pose'
import Loading from '../Loading'
import './PageLoader.css'

const PosedDiv = posed.div({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
})

class PageLoader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHidden: true,
    }
  }

  componentDidMount() {
    this.setState({ isHidden: false })
  }

  render() {
    const { isHidden } = this.state

    return (
      <FocusLock>
        <div className="PageLoader" tabIndex="-1" role="alert" autoFocus>
          <PosedDiv pose={isHidden ? 'hidden' : 'visible'}>
            <Loading className="PageLoader-loading" description="Loading..." />
          </PosedDiv>
        </div>
      </FocusLock>
    )
  }
}

export default PageLoader
