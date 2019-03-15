import React from 'react'
import classNames from 'classnames'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

import Card from './Card'
import Tag from './Tag'
import ModalLauncher from './ModalLauncher'

import './MemoryCard.css'

class MemoryCard extends React.Component {
  render() {
    const {
      id,
      title,
      tags,
      summary,
      canWrite,
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
        
        { canWrite &&
          <div className='MemoryCard-actions'>
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
              heading={ `Editing "${title}"` }
            >
              <p>Editing...</p>
            </ModalLauncher>

            <ModalLauncher
              className='MemoryCard-action'
              content={
                <FaTrashAlt
                  className='MemoryCard-actionIcon'
                  role='img'
                  aria-label='Delete'
                />
              }
              id={ `delete-memory-${id}` }
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
          </div>
        }
      </Card>
    )
  }
}

export default MemoryCard
