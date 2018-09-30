import React from 'react'
import posed from 'react-pose'

import './Modal.css'

const PosedDiv = posed.div({
  visible: {
    translateX: '-50%',
    translateY: '-50%',
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 150
    }
  },
  hidden: {
    translateY: '-45%',
    translateX: '-50%',
    opacity: 0
  }
})

class Modal extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isHidden: true
    }

    this.modalHeading = React.createRef()
  }

  componentDidMount() {
    this.setState({ isHidden: false })
    this.modalHeading.current.focus()
  }

  render() {
    const {
      id,
      heading
    } = this.props

    const { isHidden } = this.state

    return (
      <PosedDiv
        className='Modal'
        id={ id }
        aria-labelledby={ `${id}-heading` }
        aria-modal='true'
        role='dialog'
        pose={ isHidden ? 'hidden' : 'visible' }
      >
        <div className='Modal-content'>
          <div
            className='Modal-heading'
            id={ `${id}-heading` }
            ref={ this.modalHeading }
            tabIndex='-1'
          >
            { heading }
          </div>

          { this.props.children }
        </div>
      </PosedDiv>
    )
  }
}

export default Modal