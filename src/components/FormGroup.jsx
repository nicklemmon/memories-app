import React from 'react'

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
      buttonOnClick
    } = this.props;
    
    const classNames = `FormGroup-input FormGroup-input--${type} ${this.props.classNames}`
    
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
              className={ classNames }
              id={ id }
              name={ id }
              type={ type }
              placeholder={ placeholder }
              onChange={ this.props.handleChange || this.handleChange }
              value={ this.props.value || this.state.value }
            ></textarea>
          ) : (
            <input
              className={ classNames }
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
              classNames='Button--small FormGroup-button'
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