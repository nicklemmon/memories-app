import React from 'react'
import { NavLink } from 'react-router-dom';

import './Header.css'

import HeaderNav from './HeaderNav.jsx'

class Header extends React.Component {
  render() {
    const classNames = `Header ${this.props.classNames}`

    return (
      <header className={ classNames }>
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
