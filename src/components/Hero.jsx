import React from 'react'

import Button from './Button.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Heading from './Heading.jsx'

import backgroundImage from '../images/cityscape.jpg'
import './Hero.css'

class Hero extends React.Component {
  render() {
    return (
      <div className='Hero'>
        <div className='Hero-wrapper'>
          <Heading
            level='1'
            content='Track memories, view memories.'
            classNames='Hero-heading'
          />

          <ButtonWrapper classNames='Hero-buttonWrapper'>
            <Button 
              type='primary' 
              content='Log In'
              linkTo='/login'
            />

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
