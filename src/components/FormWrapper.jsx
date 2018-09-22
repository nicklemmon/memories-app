import React from 'react'

import Card from './Card.jsx'

import './FormWrapper.css'

class FormWrapper extends React.Component {
  render() {
    const method = this.props.method;
    const hasAlert = this.props.hasAlert;
    const alertType = this.props.alertType;
    const alertContent = this.props.alertContent;

    return (
      <Card 
        className='FormWrapper'
        hasAlert={ hasAlert }
        alertType={ alertType }
        alertContent={ alertContent }
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