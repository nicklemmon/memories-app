import React from 'react'
import classNames from 'classnames'
import { FaTrashAlt } from 'react-icons/fa'

import Card from './Card.jsx'
import Tag from './Tag.jsx'
import ModalLauncher from './ModalLauncher.jsx'

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
    
    // const dateStr = this.props.date || new Date()
    // const date = new Date( dateStr )

    // let day = date.getDay()

    // if ( day < 10 ) day = `0${day}`

    // let month = date.getMonth()

    // if ( month < 10 ) month = `0${month}`

    // let year = date.getFullYear()
    // let formattedDate = `${month}/${day}/${year}`

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
