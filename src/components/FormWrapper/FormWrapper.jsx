import React from 'react'

import Card from '../Card'

import './FormWrapper.css'

class FormWrapper extends React.Component {
  render() {
    const {
      method,
      hasAlert,
      alertType,
      alertContent,
      footerContent
    } = this.props

    return (
      <Card 
        className='FormWrapper'
        hasAlert={ hasAlert }
        alertType={ alertType }
        alertContent={ alertContent }
        footerContent={ footerContent }
      >
        <form
          method={ method }
          onSubmit={ this.props.handleSubmit }
        >
          { this.props.children }
        </form>
      </Card>
    )
  }
}

export default FormWrapper
