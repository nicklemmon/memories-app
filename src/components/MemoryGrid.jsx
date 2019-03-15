import React from 'react'
import Parse from 'parse'
import posed, { PoseGroup } from 'react-pose'

import MaxWidth from './MaxWidth'
import MemoryCard from './MemoryCard'
import Alert from './Alert'
import Loading from './Loading'

import './MemoryGrid.css'

const Parent = posed.div({
  enter: {
    delayChildren: 50,
    staggerChildren: 33
  }
})
const Child = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 25, opacity: 0 }
})

export default class MemoryGrid extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      memoriesURL: `${process.env.REACT_APP_API_BASE_URL}/classes/memory`,
      memories: [],
      successDelete: false,
      errorMessage: false,
      loading: false,
      canRead: false,
      canWrite: false
    }

    this.setUserPermissions = this.setUserPermissions.bind( this )
    this.getMemories = this.getMemories.bind( this )
    this.deleteMemory = this.deleteMemory.bind( this )
    this.updateMemories = this.updateMemories.bind( this )
    this.render = this.render.bind( this )
  }

  setUserPermissions() {
    const User = Parse.User.current()
    const userId = User.id
    const Permissions = User.attributes.ACL.permissionsById[userId]

    this.setState({
      canRead: Permissions.read,
      canWrite: Permissions.write
    })
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
    this.setUserPermissions()
    this.updateMemories()
  }

  render() {
    const {
      errorMessage,
      successDelete,
      memories,
      loading,
      canWrite
    } = this.state

    return (
      <React.Fragment>
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

        { loading && <Loading/> }
        
        <PoseGroup>
          { !loading &&
            <Parent className='MemoryGrid' key='grid'>
              {
                memories
                  .sort( function( a, b ) {
                    return new Date( b.recordedDate.iso ) - new Date( a.recordedDate.iso )
                  })
                  .map( memory => {
                    const date = memory.recordedDate ? new Date( memory.recordedDate.iso ).toLocaleDateString() : null

                    return (
                      <Child
                        className='MemoryGrid-cardWrapper'
                        key={ memory.objectId }
                      >
                        <MemoryCard
                          id={ `memory-card-${memory.objectId }` }
                          className='MemoryGrid-card'
                          title={ memory.title }
                          summary={ memory.summary }
                          date={ date }
                          tags={ memory.tags }
                          canWrite={ canWrite }
                          handleDelete={ () => this.deleteMemory( memory.objectId ) }
                          { ...this.props }
                        />
                      </Child>
                    )
                  } )
              }
            </Parent>
          }
        </PoseGroup>
      </React.Fragment>
    )
  }
}
