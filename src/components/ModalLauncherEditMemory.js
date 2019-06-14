import React from 'react'
import Parse, { Query } from 'parse'
import { FaPencilAlt } from 'react-icons/fa'

import ModalLauncher from './ModalLauncher'
import FormGroup from './FormGroup'

class FormEditMemory extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      title: this.props.title,
      date: this.props.date,
      summary: this.props.summary,
      hasSuccessMessage: false,
      hasErrorMessage: false,
      modalIsOpen: false
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleFormGroupChange( e ) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit( id, successCallback ) {
    const {
      title,
      summary
    } = this.state
    const memory = Parse.Object.extend( 'memory' )
    const query = new Query( memory )

    query.get( id ).then( ( object ) => {
      object.set( 'title', title )
      object.set( 'summary', summary )
      object.save()
        .then( ( response ) => {
          this.setState({ modalIsOpen: false }, () => successCallback() )
        }, ( error ) => {
          this.setState({ hasErrorMessage: true })
        })
    })
  }

  render() {
    const { 
      rawId,
      id,
      editSuccessCallback,
      editFailureCallback
    } = this.props
    const {
      title,
      date,
      summary,
      modalIsOpen
    } = this.state

    return (
      <ModalLauncher
        className='MemoryCard-action'
        content={
          <FaPencilAlt
            className='MemoryCard-actionIcon'
            role='img'
            aria-label='Edit'
          />
        }
        id={ `edit-memory-${id}`}
        heading='Edit Memory'
        hasCTAs
        primaryButtonContent='Submit'
        primaryButtonOnClick={ () => this.handleSubmit( rawId, editSuccessCallback, editFailureCallback ) }
        primaryButtonCloses
        secondaryButtonContent='Cancel'
        secondaryButtonCloses
        isOpen={ modalIsOpen }
      >
        <FormGroup
          label='Title'
          type='text'
          id='title'
          handleChange={ this.handleFormGroupChange }
          value={ title }
        />

        <FormGroup
          label='Memory Date'
          type='data'
          id='data'
          handleChange={ this.handleFormGroupChange }
          value={ date }
        />

        <FormGroup
          label='Summary'
          type='textarea'
          id='summary'
          handleChange={ this.handleFormGroupChange }
          value={ summary }
        />
      </ModalLauncher>
    )
  }
}

export default FormEditMemory
