import React from 'react'

import Modal from '../components/Modal.jsx'
import ButtonWrapper from '../components/ButtonWrapper.jsx'
import Button from '../components/Button.jsx'

class ModalDeleteMemory extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isOpen: true
    }

    this.render = this.render.bind( this )
    this.close = this.close.bind( this )
  }
  
  close() {
    this.setState({
      isOpen: false
    })
  }

  render() {
    let isOpen = this.state.isOpen
    console.log( `ModalDeleteMemory isOpen --> ${isOpen}`)

    return (
      <Modal
        id='modal-delete-memory'
        heading='Are you sure?'
        isOpen={ isOpen }
      >
        <p>Are you sure you want to delete this memory?</p>

        <ButtonWrapper>
          <Button
            type='primary'
            content='Delete'
          />

          <Button
            type='secondary'
            content='Cancel'
            onClick={ this.close }
          />
        </ButtonWrapper>
      </Modal>
    )
  }
}

export default ModalDeleteMemory