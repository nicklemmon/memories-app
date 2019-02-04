import React from 'react'
import axios from 'axios'

import MaxWidth from '../components/MaxWidth.jsx'
import MemoryCard from '../components/MemoryCard.jsx'
import Alert from '../components/Alert.jsx'
import Loading from '../components/Loading.jsx'

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
    this.updateMemories = this.updateMemories.bind( this )
    this.deleteMemory = this.deleteMemory.bind( this )
    this.render = this.render.bind( this )
  }

  getMemories() {
    return axios({
      method: 'get',
      url: this.state.memoriesURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Parse-REST-API-Key': process.env.REACT_APP_API_KEY,
        'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID
      }
    })
  }

  updateMemories() {
    this.setState( { loading: true }, () => {
      this.getMemories()
        .then( res => {
          this.setState( {
            loading: false,
            memories: res.data.results,
          })
        })
        .catch( error => {
          this.setState({
            loading: false,
            errorMessage: true
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
    const {
      errorMessage,
      successDelete,
      memories,
      loading
    } = this.state;

    console.log( memories );

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
              Object.keys( memories ).map( memory => {
                return (
                  <MemoryCard 
                    key={ memories[memory].objectId }
                    title={ memories[memory].title }
                    summary={ memories[memory].summary }
                    date={ memories[memory].createdAt }
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
