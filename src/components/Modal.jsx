import React from 'react'

import './Modal.css'

class Modal extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isOpen: false
    }
  }

  render() {
    return (
      <div class='Modal'>
        I'm a modal, yo.
      </div>
    )
  }
}

export default Modal