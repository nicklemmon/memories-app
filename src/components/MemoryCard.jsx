import React from 'react'
import classNames from 'classnames'
import { FaTrashAlt } from 'react-icons/fa'

import Card from './Card'
import Tag from './Tag'
import ModalLauncher from './ModalLauncher'
import ModalLauncherEditMemory from './ModalLauncherEditMemory'

import './MemoryCard.css'

class MemoryCard extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      title: null,
      date: null,
      summary: null
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind( this )
  }

  handleFormGroupChange( e ) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    const {
      rawId,
      id,
      title,
      tags,
      summary,
      canWrite,
      editSuccessCallback,
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
    
    // NOTE: Replace with [date-fns](https://github.com/date-fns/date-fns) probably
    const dateChunks = date.split( '/' )
    const month = dateChunks[0]
    const day = dateChunks[1]
    const year = dateChunks[2]

    let formattedDay = day
    let formattedMonth = month

    if ( day.length < 2 ) formattedDay = `0${day}`

    if ( month.length < 2 ) formattedMonth = `0${month}`

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`

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
            <ModalLauncherEditMemory
              rawId={ rawId }
              id={ id }
              title={ title }
              date={ formattedDate }
              summary={ summary }
              editSuccessCallback={ editSuccessCallback }
            />

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
