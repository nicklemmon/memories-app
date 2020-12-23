import React from 'react'
import FocusLock from 'react-focus-lock'
import { FaTimes } from 'react-icons/fa'
import { ScreenReaderOnly } from 'src/components'

export function Modal({ children, hasCloseButton, onClose }) {
  function handleKeyup(e) {
    if (e.keyCode === 27) onClose()
  }

  /*
    On mount:
    1. Add escape key listener
    2. Set overflow hidden on the html element
  */
  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyup, false)
    document.querySelector('html').setAttribute('style', 'overflow-y: hidden; height: 100vh;')
    // eslint-disable-next-line
  }, [])

  /*
    On unmount:
    1. Remove escape keyup listener
    2. Set overflow to initial on the html element
  */
  React.useEffect(() => {
    return () => {
      document.querySelector('html').setAttribute('style', 'overflow: unset')
      window.removeEventListener('keyup', handleKeyup, false)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="Modal" role="dialog" aria-modal="true">
        <FocusLock className="Modal-content">
          {children}

          {hasCloseButton ? (
            <button className="Modal-close" onClick={onClose}>
              <FaTimes aria-hidden="true" />
              <ScreenReaderOnly>Close Dialog</ScreenReaderOnly>
            </button>
          ) : null}
        </FocusLock>
      </div>

      <div className="Modal-overlay" onClick={onClose} />
    </>
  )
}

export function ModalHeading({ children }) {
  return <h3 className="Modal-heading">{children}</h3>
}
