import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { FaBars, FaSignInAlt, FaSignOutAlt, FaCloud, FaPlusCircle } from 'react-icons/fa'
import classNames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import { NavLink } from 'react-router-dom'
import { logOut } from 'src/helpers/api'
import { Toast } from 'src/components/Toast'
import { useUser } from 'src/context'
import './HeaderNav.css'
import PageLoader from 'src/components/PageLoader'

export default function HeaderNav({ className }) {
  const [handleLogout, { status }] = useMutation(logOut, {
    onSuccess: () => {},
    onError: () => {},
  })
  const [isOpen, setIsOpen] = useState(false)
  const [userState] = useUser()
  const { isLoggedIn, justLoggedOut, hasError, permissions = {} } = userState
  const { read: canRead, write: canWrite } = permissions

  function handleClickOutside() {
    setIsOpen(false)
  }

  function handleKeyUp(e) {
    if (e.keyCode === 27) setIsOpen(false)
  }

  function handleLogoutClick() {
    return handleLogout()
  }

  function toggle() {
    setIsOpen(!isOpen)
  }

  if (status === 'loading') return <PageLoader />

  return (
    <>
      {justLoggedOut && <Toast variant="success">Successfully logged out</Toast>}

      {hasError && <Toast variant="error">Failed to log out</Toast>}

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
                <NavLink
                  to="login"
                  className="HeaderNav-item"
                  onKeyUp={handleKeyUp}
                  onClick={toggle}
                >
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
    </>
  )
}
