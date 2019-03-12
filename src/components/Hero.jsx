import React from 'react'
import Parse from 'parse'

import Button from './Button'
import Card from './Card.jsx'
import Heading from './Heading.jsx'
import Alert from './Alert'

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
    const {
      hasSuccessMessage,
      userName
    } = this.props

    return (
      <div className='Hero' ref={ this.hero } tabIndex='-1'>
        <div className='Hero-wrapper'>
          <Heading
            level='1'
            content='Track memories, view memories.'
            className='Hero-heading'
          />

          <div className='Hero-content'>
            { hasSuccessMessage &&
              <Alert
                type='success'
                content={ `Success! Logged in as ${userName}.` }
                className='Hero-successMsg'
              />
            }

            <Card className='Hero-card'>
              { !isSignedIn && 
                <React.Fragment>
                  <p className='Hero-cardDirections'>Log in or sign up to get started.</p>

                  <Button 
                    type='primary' 
                    content='Log In'
                    linkTo='/login'
                    cy='button-log-in'
                  />

                  <Button
                    type='secondary'
                    content='Sign Up'
                    linkTo='/signup'
                    cy='button-sign-up'
                  />
                </React.Fragment>
              }
              
              { isSignedIn &&
                <React.Fragment>
                  <Button
                    type='primary'
                    content='Add Memory'
                    linkTo='/addmemory'
                  />

                  <Button
                    type='secondary'
                    content='View Memories'
                    linkTo='/memories'
                  />
                </React.Fragment>
              }
            </Card>
          </div>

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
