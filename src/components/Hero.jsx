import React from 'react'

import Button from './Button.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Heading from './Heading.jsx'

import backgroundImage from '../images/cityscape.jpg'
import './Hero.css'

class Hero extends React.Component {
  constructor( props ) {
    super( props )

    this.hero = React.createRef()
  }

  componentDidMount() {
    this.hero.current.focus()
  }

  render() {
    return (
      <div className='Hero' ref={ this.hero } tabIndex='-1'>
        <div className='Hero-wrapper'>
          <Heading
            level='1'
            content='Track memories, view memories.'
            className='Hero-heading'
          />

          <ButtonWrapper className='Hero-buttonWrapper'>
            { !this.props.auth.isAuthenticated() &&
              <Button 
                type='primary' 
                content='Log In'
                onClick={ this.props.auth.login }
              />
            }

            { this.props.auth.isAuthenticated() &&
              <Button
                type='primary'
                content='Add Memory'
                linkTo='/addmemory'
              />
            }

            <Button
              type='secondary'
              content='View Memories'
              linkTo='/memories'
            />
          </ButtonWrapper>

          <img 
            className='Hero-background' 
            src={ backgroundImage } 
            alt='' 
            aria-hidden='true'
          />
        </div>

        <div className='Hero-underlay'></div>
      </div>
    )
  }
}

export default Hero
