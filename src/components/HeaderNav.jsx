import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import {
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaCloud,
  FaPlusCircle
} from 'react-icons/fa'
import enhanceWithClickOutside from 'react-click-outside'

import './HeaderNav.css'

class HeaderNav extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind( this )
    this.close = this.close.bind( this )
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

  render() {
    const { className } = this.props
    const isOpen = this.state.isOpen

    return(
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
          { !this.props.auth.isAuthenticated() &&
            <div
              className='HeaderNav-item'
              role='button'
              onKeyUp={ this.handleKeyup }
              onClick={ this.props.auth.login }
            >
                <FaSignInAlt className='HeaderNav-itemIcon'/>

                Log In
            </div>
          }
          
          <NavLink 
            to='memories' 
            className='HeaderNav-item'
            onKeyUp={ this.handleKeyup }
            onClick={ this.toggle }
          >
            <FaCloud className='HeaderNav-itemIcon'/>

            View Memories
          </NavLink>

          { this.props.auth.isAuthenticated() &&
            <NavLink 
              to='addmemory' 
              className='HeaderNav-item'
              onKeyUp={ this.handleKeyup }
              onClick={ this.toggle }
            >
              <FaPlusCircle className='HeaderNav-itemIcon'/>

              Add Memory
            </NavLink>
          }
            
          { this.props.auth.isAuthenticated() &&
            <NavLink 
              to='logout' 
              className='HeaderNav-item'
              onKeyUp={ this.handleKeyup }
              onClick={ this.props.auth.logout }
            >
              <FaSignOutAlt className='HeaderNav-itemIcon'/>

              Log Out
            </NavLink>
          }
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside( HeaderNav );