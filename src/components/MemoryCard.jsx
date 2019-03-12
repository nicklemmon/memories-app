import React from 'react'
import classNames from 'classnames'
import { FaTrashAlt } from 'react-icons/fa'

import Card from './Card'
import Tag from './Tag'
import ModalLauncher from './ModalLauncher'

import './MemoryCard.css'

class MemoryCard extends React.Component {
  render() {
    const {
      title,
      tags,
      summary,
      handleDelete,
      className,
      date,
      ...attributes
    } = this.props
    
    let renderedTags

    if ( tags ) {
      renderedTags = tags.map( ( tag, index ) => {
        return (
          <Tag
            key={ `tag-${tag.name}-${index}` }
            content={ tag.name }
          />
        )
      })
    }

    return (
      <Card
        className={ classNames( 'MemoryCard', className ) }
        headingContent={ title }
        headingLevel='3'
        metaContent={ date }
        footerContent={ renderedTags }
        { ...attributes }
      >
        <p>{ summary }</p>
        
        <ModalLauncher
          className='MemoryCard-delete'
          content={ <FaTrashAlt className='MemoryCard-trash' role='img' aria-label='Delete'/> }
          id='delete-memory'
          heading={ `Delete "${title}"?` }
          hasCTAs={ true }
          primaryButtonContent='Delete'
          primaryButtonOnClick={ handleDelete }
          primaryButtonCloses={ true }
          secondaryButtonContent='Cancel'
          secondaryButtonCloses={ true }
        >
          <p>Are you sure you want to delete this memory?</p>
        </ModalLauncher>
      </Card>
    )
  }
}

export default MemoryCard
