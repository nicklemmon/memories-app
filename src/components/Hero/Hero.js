import React from 'react'
import { Button, Heading } from 'src/components'
import backgroundImage from 'src/images/feet.png'
import { useUser } from 'src/context'
import './Hero.css'

export function Hero() {
  const [userState] = useUser()
  const { isLoggedIn, permissions = {} } = userState
  const { read: canRead, write: canWrite } = permissions

  return (
    <div className="Hero">
      <div className="Hero-wrapper">
        <Heading level="1" content="Welcome to Eva&rsquo;s Memories" className="Hero-heading" />

        <p className="Hero-subheading">
          A collection of quotes and other notes from Eva's childhood.
        </p>

        <div className="Hero-content">
          {!isLoggedIn && (
            <React.Fragment>
              <Button variant="primary" linkTo="/login" cy="button-log-in">
                Log In
              </Button>

              <Button variant="tertiary" linkTo="/signup" cy="button-sign-up">
                Sign Up
              </Button>
            </React.Fragment>
          )}

          {isLoggedIn && (
            <React.Fragment>
              {canWrite && (
                <Button variant="primary" linkTo="/addmemory">
                  Add Memory
                </Button>
              )}

              {canRead && (
                <Button variant="tertiary" linkTo="/memories">
                  View Memories
                </Button>
              )}
            </React.Fragment>
          )}
        </div>

        <img className="Hero-background" src={backgroundImage} alt="" aria-hidden="true" />
      </div>
    </div>
  )
}
