import React from 'react'

import Heading from './Heading.jsx'
import Alert from './Alert.jsx'

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
    const headingLevel = this.props.headingLevel
    const headingContent = this.props.headingContent
    const metaContent = this.props.metaContent
    const footerContent = this.props.footerContent
    const classNames = `Card ${this.props.classNames}`
    const hasAlert = this.props.hasAlert || this.state.hasAlert
    const alertType = this.props.alertType || this.state.alertType
    const alertContent = this.props.alertContent || this.state.alertContent

    return (
      <div className={ classNames } role='region'>
        { headingContent &&
          <div className='Card-header'>
            <Heading
              classNames='Card-heading'
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
              classNames='Card-alert'
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