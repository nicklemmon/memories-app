import React from 'react'
import axios from 'axios'

import MemoryCard from '../components/MemoryCard.jsx'
import Alert from '../components/Alert.jsx'
import Loading from '../components/Loading.jsx'

import './MemoryGrid.css'

class MemoryGrid extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      memoriesURL: `${process.env.REACT_APP_API_BASE_URL}/api/memories`,
      memories: [],
      successDelete: false,
      loading: false
    }

    this.getMemories = this.getMemories.bind( this )
    this.updateMemories = this.updateMemories.bind( this )
    this.deleteMemory = this.deleteMemory.bind( this )
    this.render = this.render.bind( this )
  }

  getMemories() {
    return axios.get( this.state.memoriesURL )
  }

  updateMemories() {
    this.setState( { loading: true }, () => {
      this.getMemories()
        .then( res => {
          this.setState( {
            loading: false,
            memories: res.data,
          })
        })
    })
  }

  deleteMemory( memoryID ) {
    axios.delete( `${this.state.memoriesURL}/${memoryID}`, {
      params: {
        '_id': memoryID
      }
    }).then( res => {
      this.updateMemories()
      this.setState( { successDelete: true } )
    })
  }

  componentDidMount() {
    this.updateMemories()
  }

  render() {
    const memories = this.state.memories
    const loading = this.state.loading

    return (
      <div>
        { ( memories.length === 0 && !loading ) &&
          <Alert
            type="attention"
            content="Sorry! No memories available. Please try again later."
          />
        }

        { this.state.successDelete &&
          <Alert
            type="success"
            content="Memory deleted."
          />
        }
        
        { loading ? <Loading/> :
          <div className='MemoryGrid'>
            {
              Object.keys( memories ).map( memory => {
                return (
                  <MemoryCard 
                    key={ memories[memory]._id }
                    title={ memories[memory].title }
                    summary={ memories[memory].summary }
                    date={ memories[memory].date }
                    tags={ memories[memory].tags }
                    handleDelete={ () => this.deleteMemory( memories[memory]._id ) }
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