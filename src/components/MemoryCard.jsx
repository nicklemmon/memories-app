import React from 'react'
import FaTrash from 'react-icons/lib/fa/trash'

import Card from './Card.jsx'
import Tag from './Tag.jsx'
import Modal from './Modal.jsx'
import User from '../data/user.json'

import './MemoryCard.css'

class MemoryCard extends React.Component {
  render() {
    const title = this.props.title
    const tags = this.props.tags
    const dateStr = this.props.date || new Date()
    const summary = this.props.summary
    const handleDelete = this.props.handleDelete
    const date = new Date( dateStr )

    let day = date.getDay()

    if ( day < 10 ) day = `0${day}`

    let month = date.getMonth()

    if ( month < 10 ) month = `0${month}`

    let year = date.getFullYear()
    let formattedDate = `${month}/${day}/${year}`

    return (
      <Card
        classNames='MemoryCard'
        headingContent={ title }
        headingLevel='3'
        metaContent={ formattedDate }
        footerContent={
          tags.map( ( tag, index ) => {
            return (
              <Tag
                key={ index }
                content={ tag }
              />
            )
          } )
        }
      >
        <p>{ summary }</p>


        { User.isLoggedIn === true &&
          <button 
            className='MemoryCard-delete'
            onClick={ handleDelete }
          >
            <FaTrash className='MemoryCard-trash'/>
          </button>
        }
      </Card>
    )
  }
}

export default MemoryCard