import React, { useState, useEffect } from 'react'
import Parse from 'parse'
import MaxWidth from './MaxWidth'
import MemoryCard from './MemoryCard'
import Alert from './Alert'
import PageLoader from './PageLoader'
import { Toast } from './Toast'
import { useMemories, useUser } from '../context'
import './MemoryGrid.css'

export default function MemoryGrid() {
  const [state, dispatch] = useMemories()
  const [userState] = useUser()
  const [hasDeleteSuccessMessage, setHasDeleteSuccessMessage] = useState(false)
  const [hasEditSuccessMessage, setHasEditSuccessMessage] = useState(false)
  const [hasEditFailedMessage, setHasEditFailedMessage] = useState(false)
  const { isLoading, hasErrorMessage, payload: memories } = state
  const { permissions = {} } = userState
  const { write: canWrite } = permissions

  // eslint-disable-next-line
  useEffect(() => getMemories(), [])

  function getMemories() {
    const Memory = Parse.Object.extend('memory')
    const query = new Parse.Query(Memory)

    query.limit(1000)

    dispatch({ type: 'LOADING' })

    query
      .find()
      .then(res => {
        dispatch({
          type: 'SUCCESS',
          payload: JSON.parse(JSON.stringify(res)),
        })
      })
      .catch(err => dispatch({ type: 'ERROR', payload: err }))
  }

  function deleteMemory(memoryID) {
    const Memory = Parse.Object.extend('memory')
    const query = new Parse.Query(Memory)

    query.get(memoryID).then(obj => {
      obj
        .destroy()
        .then(() => {
          return getMemories()
        })
        .then(() => setHasDeleteSuccessMessage(true))
    })
  }

  function handleSuccessEdit() {
    setHasEditSuccessMessage(true)
    getMemories()
  }

  function handleFailedEdit() {
    setHasEditFailedMessage(true)
  }

  if (isLoading) return <PageLoader />

  return (
    <>
      {hasEditSuccessMessage && <Toast variant="success">Memory successfully edited</Toast>}

      {hasDeleteSuccessMessage && <Toast variant="success">Memory successfully deleted</Toast>}

      {hasEditFailedMessage && <Toast type="error">Memory failed to be edited</Toast>}

      {hasErrorMessage && <Toast variant="error">Sorry! Something went wrong</Toast>}

      {memories && memories.length === 0 && (
        <MaxWidth size="md">
          <Alert type="attention">
            <p>Sorry! No memories available. Please try again later.</p>
          </Alert>
        </MaxWidth>
      )}

      <div className="MemoryGrid">
        {memories &&
          memories
            .sort(function(a, b) {
              return new Date(b.recordedDate.iso) - new Date(a.recordedDate.iso)
            })
            .map(memory => {
              const date = memory.recordedDate
                ? new Date(memory.recordedDate.iso).toLocaleDateString()
                : null

              return (
                <div className="MemoryGrid-cardWrapper" key={memory.objectId}>
                  <MemoryCard
                    rawId={memory.objectId}
                    id={`memory-card-${memory.objectId}`}
                    className="MemoryGrid-card"
                    title={memory.title}
                    summary={memory.summary}
                    date={date}
                    tags={memory.tags}
                    canWrite={canWrite}
                    handleDelete={() => deleteMemory(memory.objectId)}
                    editSuccessCallback={handleSuccessEdit}
                    editFailureCallback={handleFailedEdit}
                    editModalOpen={false}
                  />
                </div>
              )
            })}
      </div>
    </>
  )
}
