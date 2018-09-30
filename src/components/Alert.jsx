import React from 'react'
import classNames from 'classnames'
import posed from 'react-pose'

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa'

import './Alert.css'

const PosedDiv = posed.div({
  visible: {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    transition: {
      type: 'spring',
      delay: 300
    }
  },
  hidden: {
    opacity: 0,
    scaleY: 0.66,
    scaleX: 0.925  
  }
});

class Alert extends React.Component {
  constructor( props ) {
    super( props )

    this.alertContent = React.createRef()

    this.state = {
      isHidden: true
    }

    this.show = this.show.bind( this )
    this.hide = this.hide.bind( this )
  }

  componentDidMount() {
    this.setState({ isHidden: false })
    this.alertContent.current.focus()
  }

  show() {
    this.setState( {
      isHidden: false
    })
  }

  hide() {
    this.setState( {
      isHidden: true
    })
  }

  render() {
    const {
      type,
      content,
      className,
      ...props
    } = this.props

    const isHidden = this.state.isHidden

    return (
      <PosedDiv
        className={ classNames( `Alert Alert--${type}`, className ) } 
        role='alert'
        pose={ isHidden ? 'hidden' : 'visible' }
        { ...props }
      >
        <div className='Alert-pre'>
          { type === 'error' &&
            <FaExclamationCircle className='Alert-icon'/>
          }

          { type === 'success' &&
            <FaCheckCircle className='Alert-icon'/>
          }

          { type === 'attention' &&
            <FaExclamationTriangle className='Alert-icon'/>
          }

          { type === 'info' &&
            <FaInfoCircle className='Alert-icon'/>
          }
      </div>

      <div className='Alert-content' ref={ this.alertContent } tabIndex='-1'>
        { content }
      </div>
     </PosedDiv>
    )
  }
}

export default Alert