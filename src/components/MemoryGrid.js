import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { memoriesMachine } from '../state-machines'
import MaxWidth from './MaxWidth'
import MemoryCard from './MemoryCard'
import Alert from './Alert'
import PageLoader from './PageLoader'
import { Toast } from './Toast'
import { useUser } from '../context'
import './MemoryGrid.css'

export default function MemoryGrid() {
  const [userState] = useUser()
  const [current, send, service] = useMachine(memoriesMachine)
  const { context, value: currentState } = current
  const { memories, toast } = context
  const { permissions = {} } = userState
  const { write: canWrite } = permissions

  useEffect(() => {
    send('GET_MEMORIES')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleEditSubmit(e, { id, content }) {
    e.preventDefault()

    send({ type: 'EDIT_MEMORY', data: { id, content } })
  }

  function handleDelete(id) {
    send({ type: 'DELETE_MEMORY', data: id })
  }

  console.log('MemoryGrid currentState', currentState)

  if (currentState === 'loading' || currentState === 'deleting' || currentState === 'editing')
    return <PageLoader />

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.content}</Toast>}

      {currentState === 'error' && (
        <MaxWidth size="md">
          <Alert variant="attention">
            <p>Unfortunately, something went wrong with our app. Please try again.</p>
          </Alert>
        </MaxWidth>
      )}

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
                      onEditSubmit={handleEditSubmit}
                      onOpenDeleteModal={() =>
                        send({ type: 'OPEN_DELETE_MODAL', data: { id: memory.objectId } })
                      }
                      onOpenEditModal={() =>
                        send({ type: 'OPEN_EDIT_MODAL', data: { id: memory.objectId } })
                      }
                      onCloseModal={() => send('CLOSE_MODAL')}
                      onDelete={handleDelete}
                      service={service}
                      currentState={current}
                      memoryRef={memory.ref}
                    />
                  </div>
                )
              })}
        </div>
      )}
    </>
  )
}
