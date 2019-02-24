import React from 'react'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaCloud,
  FaPlusCircle
} from 'react-icons/fa'
import Parse from 'parse'
import enhanceWithClickOutside from 'react-click-outside'

import './HeaderNav.css'

class HeaderNav extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isOpen: false,
      redirect: false
    }

    this.toggle = this.toggle.bind( this )
    this.close = this.close.bind( this )
    this.logout = this.logout.bind( this )
  }

  handleClickOutside() {
    this.close()
  }

  handleKeyup = ( e ) => {
    if ( e.keyCode === 27 ) {
      this.close()
    }
  }

  close() {
    this.setState( {
      isOpen: false
    })
  }

  toggle() {
    this.setState( prevState => ( {
      isOpen: !prevState.isOpen
    }))
  }

  logout() {
    Parse.User.logOut()
      .then( () => {
        this.setState({
          redirect: true
        }, () => {
          this.setState({ redirect: false })
        })
      })
  }

  render() {
    const { className } = this.props
    const {
      isOpen,
      redirect
    } = this.state

    return(
      <React.Fragment>
        { redirect &&
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        }

        { !redirect &&
          <div className={ classNames( 'HeaderNav', className ) }>
            <button
              onClick={ this.toggle }
              onKeyUp={ this.handleKeyup }
              className='HeaderNav-button' 
              aria-label='menu'
              aria-expanded={ isOpen ? 'true' : 'false' }
              aria-controls='HeaderNav-list'
            >
              <FaBars className='HeaderNav-buttonIcon' />
            </button>
    
            <div 
              id='HeaderNav-list'
              className={ 'HeaderNav-list ' + ( isOpen ? 'isOpen' : '' ) } 
              role='navigation' 
              aria-label='site'
            >
              <NavLink
                to='login'
                className='HeaderNav-item'
                onKeyUp={ this.handleKeyup }
                onClick={ this.toggle }
              >
                  <FaSignInAlt className='HeaderNav-itemIcon'/>
    
                  Log In
              </NavLink>
              
              <NavLink 
                to='memories' 
                className='HeaderNav-item'
                onKeyUp={ this.handleKeyup }
                onClick={ this.toggle }
              >
                <FaCloud className='HeaderNav-itemIcon'/>
    
                View Memories
              </NavLink>
    
              <NavLink 
                to='addmemory' 
                className='HeaderNav-item'
                onKeyUp={ this.handleKeyup }
                onClick={ this.toggle }
              >
                <FaPlusCircle className='HeaderNav-itemIcon'/>
    
                Add Memory
              </NavLink>

              <button
                className='HeaderNav-item'
                onClick={ this.logout }
              >
                <FaSignOutAlt className='HeaderNav-itemIcon'/>

                Log Out
              </button>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default enhanceWithClickOutside( HeaderNav );
