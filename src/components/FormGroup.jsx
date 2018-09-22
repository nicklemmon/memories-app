import React from 'react'
import classNames from 'classnames'

import Button from './Button.jsx';

import './FormGroup.css'

class FormGroup extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind( this )
  }

  handleChange( e ) {
    this.setState( {
      value: e.target.value
    })
  }

  render() {
    const {
      id,
      label,
      type,
      placeholder,
      buttonContent,
      buttonOnClick,
      className
    } = this.props
    
    const inputClassName = classNames( `FormGroup-input FormGroup-input--${type}`, className )
    
    return (
      <div className='FormGroup'>
        <label 
          className='FormGroup-label' 
          htmlFor={ id }
        >
          { label }
        </label>

        <div className='FormGroup-wrapper'>
          { type === 'textarea' ? (
            <textarea
              className={ inputClassName }
              id={ id }
              name={ id }
              type={ type }
              placeholder={ placeholder }
              onChange={ this.props.handleChange || this.handleChange }
              value={ this.props.value || this.state.value }
            ></textarea>
          ) : (
            <input
              className={ inputClassName }
              id={ id }
              name={ id }
              type={ type }
              placeholder={ placeholder }
              onChange={ this.props.handleChange || this.handleChange }
              value={ this.props.value || this.state.value }
            />
          )}
          
          { buttonContent &&
            <Button
              className='Button--small FormGroup-button'
              type='tertiary'
              onClick={ buttonOnClick }
              content={ buttonContent }
            />
          }
        </div>
      </div>
    )
  }
}

export default FormGroup