import React from 'react'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'

import './Header.css'

import HeaderNav from './HeaderNav.jsx'

class Header extends React.Component {
  render() {
    const { className } = this.props

    return (
      <header className={ classNames( 'Header', className ) }>
        <span className='Header-spacer' role='presentation'></span>

        <NavLink 
          className='Header-brand'
          to='/'
        >
          Eva's Memories
        </NavLink>

        <HeaderNav className='Header-nav' { ...this.props }/>
      </header>
    )
  }
}

export default Header
