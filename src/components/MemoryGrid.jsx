import React from 'react'
import Parse from 'parse'

import MaxWidth from '../components/MaxWidth'
import MemoryCard from '../components/MemoryCard.jsx'
import Alert from './Alert'
import Loading from '../components/Loading'

import './MemoryGrid.css'

class MemoryGrid extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      memoriesURL: `${process.env.REACT_APP_API_BASE_URL}/classes/memory`,
      memories: [],
      successDelete: false,
      errorMessage: false,
      loading: false
    }

    this.getMemories = this.getMemories.bind( this )
    this.deleteMemory = this.deleteMemory.bind( this )
    this.updateMemories = this.updateMemories.bind( this )
    this.render = this.render.bind( this )
  }

  updateMemories() {
    this.setState({ loading: true }, () => this.getMemories() )
  }

  getMemories() {
    const Memory = Parse.Object.extend( 'memory' )
    const query = new Parse.Query( Memory );

    query.limit( 1000 );

    query.find()
      .then( res => {
        this.setState({
          loading: false,
          memories: JSON.parse( JSON.stringify( res ) ) // There has *got* to be a better way to handle this 😓
        })
      })
      .catch( error => {
        this.setState({
          loading: false,
          errorMessage: true
        })
      })
  }

  deleteMemory( memoryID ) {
    const Memory = Parse.Object.extend( 'memory' )
    const query = new Parse.Query( Memory )

    query.get( memoryID )
      .then( obj => {
        obj.destroy()
      })
      .then( () => {
        this.updateMemories()
      })
      .catch( error => {
        console.log( error )
      })
  }

  componentDidMount() {
    this.updateMemories()
  }

  render() {
    const {
      errorMessage,
      successDelete,
      memories,
      loading
    } = this.state

    return (
      <div>
        { ( errorMessage && !loading ) &&
          <MaxWidth size='md'>
            <Alert
              type="error"
              content="Whoops! Failed to retrieve memories. Try again later."
            />
          </MaxWidth>
        }

        { ( !errorMessage && memories.length === 0 && !loading ) &&
          <MaxWidth size='md'>
            <Alert
              type='attention'
              content='Sorry! No memories available. Please try again later.'
            />
          </MaxWidth>
        }

        { successDelete &&
          <MaxWidth size='md'>
            <Alert
              type='success'
              content='Memory deleted.'
            />
          </MaxWidth>
        }
        
        { loading ? <Loading/> :
          <div className='MemoryGrid'>
            {
              memories.map( memory => {
                return (
                  <MemoryCard 
                    key={ memory.objectId }
                    title={ memory.title }
                    summary={ memory.summary }
                    date={ new Date( memory.createdAt ).toLocaleDateString() }
                    tags={ memory.tags }
                    handleDelete={ () => this.deleteMemory( memory.objectId ) }
                    { ...this.props }
                  />
                )
              } )
            }
          </div>
        }
      </div>
    )
  }
}

export default MemoryGrid
