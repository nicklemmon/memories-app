import React from 'react'

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
    const id = this.props.id
    const label = this.props.label
    const type = this.props.type
    const placeholder = this.props.placeholder
    const classNames = `FormGroup-input FormGroup-input--${type} ${this.props.classNames}`
    
    return (
      <div className='FormGroup'>
        <label 
          className='FormGroup-label' 
          htmlFor={ id }
        >
          { label }
        </label>

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
        
      </div>
    )
  }
}

export default FormGroup