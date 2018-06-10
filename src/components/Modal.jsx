import React from 'react'

import './Modal.css'

class Modal extends React.Component {
  render() {
    console.log( `Modal this.props.isOpen --> ${this.props.isOpen}`)
    const id = this.props.id
    const heading = this.props.heading
    const isOpen = this.props.isOpen

    return (
      <React.Fragment>
        <div className='Modal' id={ id } aria-labelledby={ `${id}-heading` }>
          <div className='Modal-content'>
            <div className='Modal-heading' id={ `${id}-heading` }>{ heading }</div>

            { this.props.children }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Modal