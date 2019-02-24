import React from 'react'
import Parse from 'parse'

import Button from './Button.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Heading from './Heading.jsx'

import backgroundImage from '../images/cityscape.jpg'
import './Hero.css'

class Hero extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isSignedIn: false
    }

    this.fetchUser = this.fetchUser.bind( this )
    this.hero = React.createRef()
  }

  fetchUser() {
    if ( Parse.User.current() ) {
      this.setState({ isSignedIn: true })
    }
  }

  componentDidMount() {
    this.fetchUser()
    this.hero.current.focus()
  }

  render() {
    const { isSignedIn } = this.state

    return (
      <div className='Hero' ref={ this.hero } tabIndex='-1'>
        <div className='Hero-wrapper'>
          <Heading
            level='1'
            content='Track memories, view memories.'
            className='Hero-heading'
          />

          <p>{ this.state.currentUser }</p>

          <ButtonWrapper className='Hero-buttonWrapper'>
            { !isSignedIn && 
              <Button 
                type='primary' 
                content='Log In'
                linkTo='/login'
              />
            }
            
            { isSignedIn &&
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
