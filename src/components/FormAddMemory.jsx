import React from 'react'
import axios from 'axios'

import Alert from '../components/Alert.jsx'
import FormWrapper from '../components/FormWrapper.jsx'
import FormGroup from '../components/FormGroup.jsx'
import ButtonWrapper from '../components/ButtonWrapper.jsx'
import Button from '../components/Button.jsx'

class FormAddMemory extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      title: '',
      date: '',
      summary: '',
      tags: '',
      successAdd: false
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
    this.resetForm = this.resetForm.bind( this )
    this.render = this.render.bind( this )
  }

  handleFormGroupChange( e ) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState( {
      [name]: value
    })
  }

  resetForm() {
    this.setState({
      title: '',
      date: '',
      summary: '',
      tags: ''
    })
  }

  handleSubmit( e ) {
    e.preventDefault()

    axios.post( 'http://localhost:3001/api/memories', {
        title: this.state.title,
        date: this.state.date,
        summary: this.state.summary,
        tags: this.state.tags
      })
      .then( res => {
        this.resetForm()
        this.setState( { successAdd: true } )
      })
      .catch( error => {
        console.log( error )
      })
  }

  render() {
    let hasAlert
    let alertType
    let alertContent
    
    console.log( this.state.successAdd )

    if ( this.state.successAdd ) {
      hasAlert = true
      alertType = 'success'
      alertContent = 'Success! Memory added.'
    }

    return (
      <FormWrapper 
        handleSubmit={ this.handleSubmit }
        hasAlert={ hasAlert }
        alertType={ alertType }
        alertContent={ alertContent }
      >
        <FormGroup
          label='Title'
          type='text'
          id='title'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.title }
        />

        <FormGroup
          label='Memory Date'
          type='date'
          id='date'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.date }
        />

        <FormGroup
          label='Summary'
          type='textarea'
          id='summary'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.summary }
        />

        <FormGroup
          label='Tags'
          type='text'
          id='tags'
          handleChange={ this.handleFormGroupChange }
          value={ this.state.tags }
        />

        <ButtonWrapper>
          <Button
            type='primary'
            content='Add'
            onClick={ this.handleFormSubmit }
          />

          <Button
            type='secondary'
            content='Cancel'
          />
        </ButtonWrapper>
      </FormWrapper>
    )
  }
}

export default FormAddMemory