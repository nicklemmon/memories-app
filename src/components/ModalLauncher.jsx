import React from 'react'
import FaClose from 'react-icons/lib/fa/close'

import Modal from './Modal.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Button from './Button.jsx'

class ModalButton extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isOpen: false
    }

    this.modalElement = React.createRef()

    this.open = this.open.bind( this )
    this.close = this.close.bind( this )
    this.handleKeyup = this.handleKeyup.bind( this )
    this.primaryButtonHandleClick = this.primaryButtonHandleClick.bind( this )
    this.secondaryButtonHandleClick = this.secondaryButtonHandleClick.bind( this )
  }

  open() {
    this.setState({
      isOpen: true
    })

    window.addEventListener( 'keyup', this.handleKeyup, false )
    document.querySelector( 'html' ).setAttribute( 'style', 'overflow-y: hidden; height: 100vh;' )
  }

  close() {
    this.setState({
      isOpen: false 
    })

    window.removeEventListener( 'keyup', this.handleKeyUp, false )
    document.querySelector( 'html' ).setAttribute( 'style', '' )
  }

  handleKeyup( e ) {
    if ( e.keyCode === 27 ) this.close()
  }

  primaryButtonHandleClick( e ) {
    const primaryButtonCloses = this.props.primaryButtonCloses

    if ( primaryButtonCloses ) this.close()
  }
  
  secondaryButtonHandleClick( e ) {
    const secondaryButtonCloses = this.props.secondaryButtonCloses

    if ( secondaryButtonCloses ) this.close()
  }

  render() {
    const content = this.props.content
    const id = this.props.id
    const heading = this.props.heading
    const hasCTAs = this.props.hasCTAs
    const primaryButtonContent = this.props.primaryButtonContent
    const primaryButtonLinkTo = this.props.primaryButtonLinkTo
    const secondaryButtonContent = this.props.secondaryButtonContent
    const secondaryButtonLinkTo = this.props.secondaryButtonLinkTo

    const isOpen = this.state.isOpen

    return (
      <React.Fragment>
        <button
          className='Modal-button'
          aria-modal='dialog'
          title='Opens a dialog'
          onClick={ this.open }
        >
          { content }
        </button>

        { isOpen &&
          <Modal
            id={ id }
            heading={ heading }
            modalRef={ this.modalElement }
          >
            { this.props.children }

            { hasCTAs &&
              <ButtonWrapper>
                { primaryButtonContent &&
                  <Button
                    type='primary'
                    content={ primaryButtonContent }
                    onClick={ this.primaryButtonHandleClick }
                    linkTo={ primaryButtonLinkTo }
                  />
                }

                { secondaryButtonContent &&
                  <Button
                    type='secondary'
                    content={ secondaryButtonContent }
                    onClick={ this.secondaryButtonHandleClick }
                    linkTo={ secondaryButtonLinkTo }
                  />
                }
              </ButtonWrapper>
            }

            <button className='Modal-close' aria-label='Close dialog' onClick={ this.close }>
              <span aria-hidden='true'>
                <FaClose/>
              </span>
            </button>
          </Modal>
        }

        { isOpen &&
          <div className='Modal-overlay' onClick={ this.close }/>
        }
      </React.Fragment>
    )
  }
}

export default ModalButton