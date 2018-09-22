import React from 'react'
import classNames from 'classnames'

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa'

import './Alert.css'

class Alert extends React.Component {
  constructor( props ) {
    super( props )

    this.alertContent = React.createRef()

    this.state = {
      isHidden: false
    }

    this.show = this.show.bind( this )
    this.hide = this.hide.bind( this )
  }

  componentDidMount() {
    this.alertContent.current.focus()
  }

  show() {
    this.setState( {
      isHidden: false
    } )
  }

  hide() {
    this.setState( {
      isHidden: true
    } )
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
      <React.Fragment>
        { !isHidden &&
          <div 
            className={ classNames( `Alert Alert--${type}`, className ) } 
            role='alert' 
            tabIndex='-1'
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
          </div>
        }
     </React.Fragment>
    )
  }
}

export default Alert