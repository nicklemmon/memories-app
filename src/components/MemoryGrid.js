/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { memoriesMachine } from '../state-machines'
import MaxWidth from './MaxWidth'
import MemoryCard from './MemoryCard'
import Alert from './Alert'
import PageLoader from './PageLoader'
import { Toast } from './Toast'
import { useMemories, useUser } from '../context'
import './MemoryGrid.css'

export default function MemoryGrid() {
  const [current, send] = useMachine(memoriesMachine)
  const [userState] = useUser()
  const { context, value: currentState } = current
  const { memories, toast } = context
  const { permissions = {} } = userState
  const { write: canWrite } = permissions

  useEffect(() => {
    send('GET_MEMORIES')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSuccessEdit() {
    send('EDIT_MEMORY_SUCCEEDED')
  }

  function handleFailedEdit() {
    send('EDIT_MEMORY_FAILED')
  }

  console.log('current', current)
  console.log('currentState', currentState)
  console.log('context', context)

  if (currentState === 'loading') return <PageLoader />

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.content}</Toast>}

      {currentState === 'idle' && memories.length === 0 && (
        <MaxWidth size="md">
          <Alert variant="attention">
            <p>Sorry! No memories available. Please try again later.</p>
          </Alert>
        </MaxWidth>
      )}

      {currentState === 'idle' && (
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
                      handleDelete={() => send({ type: 'DELETE_MEMORY', data: memory.objectId })}
                      editSuccessCallback={handleSuccessEdit}
                      editFailureCallback={handleFailedEdit}
                      editModalOpen={false}
                    />
                  </div>
                )
              })}
        </div>
      )}
    </>
  )
}
