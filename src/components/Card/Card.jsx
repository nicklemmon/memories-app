import React from 'react'
import classNames from 'classnames'

import Heading from '../Heading'
import Alert from '../Alert'

import './Card.css'

class Card extends React.Component {
  constructor( props ) {
    super( props )
    
    this.state = {
      hasAlert: false,
      alertType: '',
      alertContent: ''
    }
  }
  
  render() {
    const {
      headingLevel,
      headingContent,
      metaContent,
      footerContent,
      className
    } = this.props
    
    const hasAlert = this.props.hasAlert || this.state.hasAlert
    const alertType = this.props.alertType || this.state.alertType
    const alertContent = this.props.alertContent || this.state.alertContent

    return (
      <div className={ classNames( 'Card', className ) } role='region'>
        { headingContent &&
          <div className='Card-header'>
            <Heading
              className='Card-heading'
              content={ headingContent }
              level={ headingLevel }
            />

            <span className='Card-meta'>
              { metaContent }
            </span>
          </div>
        }

        <div className='Card-content'>
          { hasAlert &&
            <Alert
              className='Card-alert'
              type={ alertType }
              content={ alertContent }
            />
          }

          { this.props.children }
        </div>

        { footerContent &&
          <div className='Card-footer'>
            { footerContent }
          </div>
        }
      </div>
    )
  }
}

export default Card
