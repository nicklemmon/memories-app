import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa'
import './Alert.css'

export function Alert(props) {
  const { variant, children, className, cy } = props

  return (
    <div role="alert" className={classNames(`Alert Alert--${variant}`, className)} data-cy={cy}>
      <div className="Alert-pre">
        {variant === 'error' && <FaExclamationCircle className="Alert-icon" />}

        {variant === 'success' && <FaCheckCircle className="Alert-icon" />}

        {variant === 'attention' && <FaExclamationTriangle className="Alert-icon" />}

        {variant === 'info' && <FaInfoCircle className="Alert-icon" />}
      </div>

      <div className="Alert-content">{children}</div>
    </div>
  )
}

Alert.propTypes = {
  variant: PropTypes.oneOf(['error', 'success', 'attention', 'info']),
  className: PropTypes.string,
}
