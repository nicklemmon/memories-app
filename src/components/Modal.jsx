import React from 'react'
import FaClose from 'react-icons/lib/fa/close'

import './Modal.css'

class Modal extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isOpen: true
    }

    this.preventPageScroll = this.preventPageScroll.bind( this )
    this.enablePageScroll = this.enablePageScroll.bind( this )
    this.close = this.close.bind( this )
  }

  preventPageScroll() {
    document.querySelector( 'html' ).setAttribute( 'style', 'overflow-y: hidden; height: 100vh;' );
  }

  enablePageScroll() {
    document.querySelector( 'html' ).setAttribute( 'style', '' );
  }

  close() {
    this.setState({
      isOpen: false
    })
  }

  componentWillReceiveProps( newProps ) {
    if ( this.state.isOpen !== newProps.isOpen ) {
      this.setState({
        isOpen: newProps.isOpen
      });
    }
  }

  render() {
    console.log( `Modal this.props.isOpen --> ${this.props.isOpen}`)
    const id = this.props.id
    const heading = this.props.heading
    const isOpen = this.state.isOpen
    const classNames = `Modal ${ isOpen ? 'is-open' : 'is-closed'}`
    const overlayClassNames = `Modal-overlay ${ isOpen ? 'is-visible' : 'is-invisible'}`
    
    if ( isOpen ) {
      this.preventPageScroll()
    } else {
      this.enablePageScroll()
    }

    console.log( `Modal isOpen --> ${isOpen}`)
    return (
      <React.Fragment>
        <div className={ classNames } id={ id } aria-labelledby={`${id}-heading`}>
          <div className='Modal-content'>
            <div className='Modal-heading' id={`${id}-heading`}>{ heading }</div>

            { this.props.children }

            <button className='Modal-close' aria-label='Close dialog' onClick={ this.close }>
              <span aria-hidden='true'>
                <FaClose/>
              </span>
            </button>
          </div>
        </div>

        <div className={ overlayClassNames }/>
      </React.Fragment>
    )
  }
}

export default Modal