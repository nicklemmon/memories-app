import React from 'react'

import FaCheckCircle from 'react-icons/lib/fa/check-circle'
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle'
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'

import './Alert.css'

class Alert extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isHidden: false
    }

    this.show = this.show.bind( this )
    this.hide = this.hide.bind( this )
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
    const type = this.props.type
    const content = this.props.content
    const isHidden = this.state.isHidden
    const classNames = `Alert Alert--${type} ${this.props.classNames}`

    return (
      <React.Fragment>
        { !isHidden &&
          <div 
            className={ classNames } 
            role='alert' 
            tabIndex='-1'
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

            <div className='Alert-content'>
              { content }
            </div>
          </div>
        }
     </React.Fragment>
    )
  }
}

export default Alert