import React, { useEffect } from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import { useToast } from 'src/context'
import { ScreenReaderOnly } from 'src/components'
import './ToastList.css'

function ToastItem(props) {
  const { children, variant = 'error', onClose } = props

  return (
    <div role="alert" className={classNames('ToastItem', `ToastItem--${variant}`)}>
      <span>
        {variant === 'error' && <FaExclamationCircle className="ToastItem-icon" />}

        {variant === 'success' && <FaCheckCircle className="ToastItem-icon" />}

        {variant === 'attention' && <FaExclamationTriangle className="ToastItem-icon" />}
      </span>

      <span>{children}</span>

      <button className="ToastItem-closeButton" onClick={onClose}>
        <FaTimes aria-hidden="true" />

        <ScreenReaderOnly>Close</ScreenReaderOnly>
      </button>
    </div>
  )
}

export function ToastList() {
  const [state, dispatch] = useToast()
  const { toasts } = state

  useEffect(() => {
    if (toasts.length) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', index: 0 })
      }, 12000)
    }
  }, [toasts, dispatch])

  return (
    <div className="ToastList">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={`toast-${index}`}
            exit={{}}
            layoutTransition
            className="ToastList-itemWrapper"
          >
            <ToastItem
              variant={toast.variant}
              onClose={() => dispatch({ type: 'REMOVE_TOAST', index })}
            >
              {toast.message}
            </ToastItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
