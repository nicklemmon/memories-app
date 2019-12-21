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

export default function Alert(props) {
  const { type, children, className, cy } = props

  return (
    <div role="alert" className={classNames(`Alert Alert--${type}`, className)} data-cy={cy}>
      <div className="Alert-pre">
        {type === 'error' && <FaExclamationCircle className="Alert-icon" />}

        {type === 'success' && <FaCheckCircle className="Alert-icon" />}

        {type === 'attention' && <FaExclamationTriangle className="Alert-icon" />}

        {type === 'info' && <FaInfoCircle className="Alert-icon" />}
      </div>

      <div className="Alert-content">{children}</div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['error', 'success', 'attention', 'info']),
  className: PropTypes.string,
}
