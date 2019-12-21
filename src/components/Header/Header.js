import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import './Header.css'
import HeaderNav from '../HeaderNav'

export default function Header(props) {
  const { className, user } = props

  return (
    <header className={classNames('Header', className)} data-cy="header">
      <span className="Header-user">{user && user.username}</span>

      <NavLink className="Header-brand" to="/">
        Eva's Memories
      </NavLink>

      <HeaderNav className="Header-nav" user={user} />
    </header>
  )
}
