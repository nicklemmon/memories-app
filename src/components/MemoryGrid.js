import React from 'react'
import Parse from 'parse'
import posed, { PoseGroup } from 'react-pose'

import MaxWidth from './MaxWidth'
import MemoryCard from './MemoryCard'
import Alert from './Alert'
import AppStore from '../stores/AppStore'

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
    this.handleSuccessEdit = this.handleSuccessEdit.bind( this )
    this.handleFailedEdit = this.handleFailedEdit.bind( this )
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
    const query = new Parse.Query( Memory )

    query.limit( 1000 )

    AppStore.setLoading()

    query.find()
      .then( res => {
        this.setState({
          memories: JSON.parse( JSON.stringify( res ) ) // There has *got* to be a better way to handle this 😓
        })
      })
      .catch( error => {
        this.setState({
          errorMessage: true
        })
      })
      .then( () => {
        this.setState({ loading: false })
        AppStore.unsetLoading()
      })
  }

  deleteMemory( memoryID ) {
    const Memory = Parse.Object.extend( 'memory' )
    const query = new Parse.Query( Memory )

    query.get( memoryID )
      .then( obj => {
        obj.destroy()
        this.updateMemories()
      })
      .catch( error => {
        console.log( error )
      })
  }

  handleSuccessEdit() {
    this.setState({
      successEdit : true,
    }, () => this.getMemories() )
  }

  handleFailedEdit() {
    this.setState({
      failedEdit : true,
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
      successEdit,
      failedEdit,
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
              content='Memory successfully deleted.'
            />
          </MaxWidth>
        }

        { successEdit &&
          <MaxWidth size='md'>
            <Alert
              type='success'
              content='Memory successfully edited.'
            />
          </MaxWidth>
        }

        { failedEdit &&
          <MaxWidth size='md'>
            <Alert
              type='error'
              content='Memory failed to be edited. Try again!'
            />
          </MaxWidth>
        }
        
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
                          rawId={ memory.objectId }
                          id={ `memory-card-${memory.objectId }` }
                          className='MemoryGrid-card'
                          title={ memory.title }
                          summary={ memory.summary }
                          date={ date }
                          tags={ memory.tags }
                          canWrite={ canWrite }
                          handleDelete={ () => this.deleteMemory( memory.objectId ) }
                          editSuccessCallback={ this.handleSuccessEdit }
                          editFailureCallback={ this.handleFailedEdit }
                          editModalOpen={ false }
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
