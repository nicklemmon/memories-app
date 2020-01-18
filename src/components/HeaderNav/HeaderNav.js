import React, { useState } from 'react'
import Parse from 'parse'
import classNames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import { NavLink, useHistory } from 'react-router-dom'
import { FaBars, FaSignInAlt, FaSignOutAlt, FaCloud, FaPlusCircle } from 'react-icons/fa'
import { useUser } from '../../context'
import './HeaderNav.css'

export default function HeaderNav({ className }) {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [userState, userDispatch] = useUser()
  const { isLoggedIn, permissions = {} } = userState
  const { read: canRead, write: canWrite } = permissions

  function handleClickOutside() {
    setIsOpen(false)
  }

  function handleKeyUp(e) {
    if (e.keyCode === 27) setIsOpen(false)
  }

  function handleLogoutClick() {
    Parse.User.logOut()
    toggle()
    userDispatch({ type: 'LOGGED_OUT' })
    history.push('/')
  }

  function toggle() {
    setIsOpen(!isOpen)
  }

  return (
    <div className={classNames('HeaderNav', className)}>
      <OutsideClickHandler onOutsideClick={handleClickOutside}>
        <button
          onClick={toggle}
          onKeyUp={handleKeyUp}
          className="HeaderNav-button"
          aria-label="menu"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls="HeaderNav-list"
        >
          <FaBars className="HeaderNav-buttonIcon" />
        </button>

        {isOpen && (
          <div id="HeaderNav-list" className="HeaderNav-list" role="navigation" aria-label="site">
            {!isLoggedIn && (
              <NavLink to="login" className="HeaderNav-item" onKeyUp={handleKeyUp} onClick={toggle}>
                <FaSignInAlt className="HeaderNav-itemIcon" />
                Log In
              </NavLink>
            )}

            {isLoggedIn && canRead && (
              <NavLink
                to="memories"
                className="HeaderNav-item"
                onKeyUp={handleKeyUp}
                onClick={toggle}
              >
                <FaCloud className="HeaderNav-itemIcon" />
                View Memories
              </NavLink>
            )}

            {isLoggedIn && canWrite && (
              <NavLink
                to="addmemory"
                className="HeaderNav-item"
                onKeyUp={handleKeyUp}
                onClick={toggle}
              >
                <FaPlusCircle className="HeaderNav-itemIcon" />
                Add Memory
              </NavLink>
            )}

            {isLoggedIn && (
              <button className="HeaderNav-item" onClick={handleLogoutClick}>
                <FaSignOutAlt className="HeaderNav-itemIcon" />
                Log Out
              </button>
            )}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  )
}
