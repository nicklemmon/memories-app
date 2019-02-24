import React from 'react'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'

import './Header.css'

import HeaderNav from './HeaderNav.jsx'

class Header extends React.Component {
  render() {
    const {
      className,
      user
    } = this.props

    return (
      <header className={ classNames( 'Header', className ) }>
        <span className='Header-user'>
          { user && user.username }
        </span>

        <NavLink 
          className='Header-brand'
          to='/'
        >
          Eva's Memories
        </NavLink>

        <HeaderNav
          className='Header-nav'
          user={ user }
        />
      </header>
    )
  }
}

export default Header
