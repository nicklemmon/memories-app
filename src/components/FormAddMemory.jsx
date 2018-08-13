import React from 'react'
import axios from 'axios'

import FormWrapper from './FormWrapper.jsx'
import FormGroup from './FormGroup.jsx'
import FormGroupTagInput from './FormGroupTagInput.jsx'
import ButtonWrapper from './ButtonWrapper.jsx'
import Button from './Button.jsx'

class FormAddMemory extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      title: '',
      date: '',
      summary: '',
      tags: [{ name: ''}],
      tagInputs: 1,
      tagMax: 3,
      tagMaxReached: false,
      successAdd: false
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
    this.handleFormGroupTagChange = this.handleFormGroupTagChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
    this.handleAddTagClick = this.handleAddTagClick.bind( this )
    this.resetForm = this.resetForm.bind( this )
    this.render = this.render.bind( this )
  }

  handleFormGroupChange( e ) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleFormGroupTagChange( e, index ) {
    const newTags = this.state.tags.map( ( tag, sindex ) => {
      if (index !== sindex) return tag

      return { ...tag, name: e.target.value }
    });

    this.setState({ tags: newTags })
  }

  resetForm() {
    this.setState({
      title: '',
      date: '',
      summary: '',
      tags: [{ name: ''}]
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

  handleAddTagClick( e ) {
    e.preventDefault()

    this.setState({
      tags: this.state.tags.concat( [ { name: '' } ] )
    });
  }

  render() {
    const {
      tags,
      tagMaxReached,
      successAdd
    } = this.state;

    let hasAlert
    let alertType
    let alertContent

    if ( successAdd ) {
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

        { tags.map( ( tag, index ) => {
            return(
              <FormGroupTagInput
                index={ index }
                key={ `tag-input-${index}` }
                handleChange={ ( e ) => this.handleFormGroupTagChange( e, index ) }
                value={ tag.name }
              />
            )
          })
        }

        <ButtonWrapper>
          { tagMaxReached ?
            <p>Maximum of 3 tags per memory.</p>

            :

            <Button
              type='tertiary'
              content='Add Another Tag'
              onClick={ this.handleAddTagClick }
              fullWidth={ true }
            />
          }
        </ButtonWrapper>

        <ButtonWrapper>
          <Button
            type='primary'
            content='Add Memory'
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