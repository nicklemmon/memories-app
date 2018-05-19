import React from 'react'
import { NavLink } from 'react-router-dom'
import FaBars from 'react-icons/lib/fa/bars'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import FaSignOut from 'react-icons/lib/fa/sign-out'
import FaCloud from 'react-icons/lib/fa/cloud'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import enhanceWithClickOutside from 'react-click-outside'

import User from '../data/user.json'

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
    this.close();
  }

  handleKeyup = ( e ) => {
    if ( e.keyCode === 27 ) {
      this.close();
    }
  }

  close() {
    this.setState( {
      isOpen: false
    } )
  }

  toggle() {
    this.setState( prevState => ( {
      isOpen: !prevState.isOpen
    } ) )
  }

  render() {
    const isOpen = this.state.isOpen
    const classNames = `HeaderNav ${this.props.className}`

    return(
      <div className={ classNames }>
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
          { User.isLoggedIn === false &&
            <NavLink 
            to='login' 
            className='HeaderNav-item'
            onKeyUp={ this.handleKeyup }
            onClick={ this.toggle }
            >
              <FaSignIn className='HeaderNav-itemIcon'/>

              Log In
            </NavLink>
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

          { User.isLoggedIn === true &&
            <div>
              <NavLink 
                to='addmemory' 
                className='HeaderNav-item'
                onKeyUp={ this.handleKeyup }
                onClick={ this.toggle }
              >
                <FaPlusCircle className='HeaderNav-itemIcon'/>

                Add Memory
              </NavLink>
            
              <NavLink 
                to='logout' 
                className='HeaderNav-item'
                onKeyUp={ this.handleKeyup }
                onClick={ this.toggle }
              >
                <FaSignOut className='HeaderNav-itemIcon'/>

                Log Out
              </NavLink>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside( HeaderNav );