import React from 'react'
import { useQuery, useMutation } from 'react-query'
import FocusLock from 'react-focus-lock'
import { FaPencilAlt, FaTimes, FaTrashAlt } from 'react-icons/fa'
import { getMemories, deleteMemory, updateMemory } from 'src/helpers/api'
import { formatMemories } from 'src/helpers/memories'
import { dateToValue, valueToDate } from 'src/helpers/date'
import MaxWidth from './MaxWidth'
import { Card, CardHeader, CardHeading, CardContent, CardFooter } from './Card'
import Alert from './Alert'
import PageLoader from './PageLoader'
import ScreenReaderOnly from './ScreenReaderOnly'
import FormGroup from './FormGroup'
import Button from './Button'
import ButtonWrapper from './ButtonWrapper'
import Tag from './Tag'
import { useUser, useToast } from 'src/context'
import './MemoryGrid.css'
import './Modal/Modal.css'

const initialState = {
  memoryToDelete: {},
  memoryToEdit: {},
  status: 'idle',
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_DELETE_MODAL': {
      return {
        ...state,
        memoryToDelete: action.memory,
        status: 'deleting-memory',
      }
    }

    case 'OPEN_EDIT_MODAL': {
      return {
        ...state,
        memoryToEdit: action.memory,
        status: 'editing-memory',
      }
    }

    case 'CLOSE_MODAL': {
      return {
        ...state,
        memoryToEdit: {},
        memoryToDelete: {},
        status: 'idle',
      }
    }

    default: {
      throw new Error(`${action.type} is not supported by the MemoryGrid component`)
    }
  }
}

export default function MemoryGrid() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { status, data } = useQuery('getMemories', getMemories, {
    enabled: state.status === 'idle' ? true : false, // TODO: Might need to be tied to an effect -  Refetch memories when hitting the 'idle' UI state
  })
  const [userState] = useUser()
  const { permissions = {} } = userState
  const { write: canWrite } = permissions

  if (status === 'loading') return <PageLoader />

  if (status === 'error') {
    return (
      <MaxWidth size="md">
        <Alert variant="attention">
          <p>Sorry! Something went wrong. Please try again later.</p>
        </Alert>
      </MaxWidth>
    )
  }

  if (data && data.length === 0) {
    return (
      <MaxWidth size="md">
        <Alert variant="info">
          <p>No memories available.</p>
        </Alert>
      </MaxWidth>
    )
  }

  const memories = formatMemories(data)

  return (
    <>
      <div role="list" className="MemoryGrid">
        {memories.map(memory => {
          return (
            <div key={memory.objectId} role="listitem" className="MemoryGrid-cardWrapper">
              <Card className="MemoryCard">
                <CardHeader metaContent={memory.date}>
                  <CardHeading>{memory.title}</CardHeading>
                </CardHeader>

                <CardContent>
                  <p>{memory.summary}</p>

                  <div className="MemoryCard-actions">
                    {canWrite ? (
                      <>
                        <Action onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL', memory })}>
                          <ActionIcon as={FaPencilAlt} />
                          <ScreenReaderOnly>Edit</ScreenReaderOnly>
                        </Action>

                        <Action onClick={() => dispatch({ type: 'OPEN_DELETE_MODAL', memory })}>
                          <ActionIcon as={FaTrashAlt} />
                          <ScreenReaderOnly>Delete</ScreenReaderOnly>
                        </Action>
                      </>
                    ) : null}
                  </div>
                </CardContent>

                {memory.tags && Boolean(memory.tags.length) ? (
                  <CardFooter>
                    {memory.tags.map((tag, index) => {
                      return <Tag key={`${memory.objectId}-tag-${index}`} content={tag.name} />
                    })}
                  </CardFooter>
                ) : null}
              </Card>
            </div>
          )
        })}
      </div>

      {state.status === 'editing-memory' ? (
        <EditModal memory={state.memoryToEdit} onClose={() => dispatch({ type: 'CLOSE_MODAL' })} />
      ) : null}

      {state.status === 'deleting-memory' ? (
        <DeleteModal
          memory={state.memoryToDelete}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        />
      ) : null}
    </>
  )
}

function Action({ onClick, children }) {
  return (
    <button onClick={onClick} className="MemoryCard-action">
      {children}
    </button>
  )
}

function ActionIcon({ as }) {
  const Component = as

  return <Component className="MemoryCard-actionIcon" aria-hidden="true" />
}

function EditModal({ memory, onClose }) {
  // eslint-disable-next-line
  const [state, dispatch] = useToast()
  const { objectId } = memory
  const [title, setTitle] = React.useState(memory.title)
  const [recordedDate, setRecordedDate] = React.useState(memory.recordedDate)
  const [summary, setSummary] = React.useState(memory.summary)

  const [handleUpdate, { status }] = useMutation(
    () =>
      updateMemory({
        title,
        summary,
        recordedDate: valueToDate(recordedDate),
        objectId,
      }),
    {
      onSuccess: () => {
        onClose()
        dispatch({ type: 'ADD_TOAST', variant: 'success', message: 'Memory updated' })
      },
      onError: () =>
        dispatch({
          type: 'ADD_TOAST',
          variant: 'error',
          message: 'Update failed - try again later',
        }),
    },
  )

  function handleSubmit(e) {
    e.preventDefault()

    return handleUpdate()
  }

  return (
    <Modal hasCloseButton onClose={onClose}>
      <ModalHeading>Edit Modal</ModalHeading>

      <form onSubmit={handleSubmit}>
        <FormGroup
          label="Title"
          type="text"
          id="title"
          handleChange={e => setTitle(e.target.value)}
          value={title}
          disabled={status === 'loading'}
        />

        <FormGroup
          label="Memory Date"
          type="date"
          id="date"
          handleChange={e => setRecordedDate(e.target.value)}
          value={dateToValue(recordedDate)}
          disabled={status === 'loading'}
        />

        <FormGroup
          label="Summary"
          type="textarea"
          id="summary"
          handleChange={e => setSummary(e.target.value)}
          value={summary}
          disabled={status === 'loading'}
        />

        <ButtonWrapper>
          <Button disabled={status === 'loading'} variant="primary" type="submit">
            Save
          </Button>

          <Button disabled={status === 'loading'} variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ButtonWrapper>
      </form>
    </Modal>
  )
}

function DeleteModal({ memory, onClose }) {
  // eslint-disable-next-line
  const [state, dispatch] = useToast()
  const [handleDelete, { status }] = useMutation(() => deleteMemory(memory.objectId), {
    onSuccess: () => {
      onClose()
      dispatch({ type: 'ADD_TOAST', variant: 'success', message: 'Memory deleted' })
    },
    onError: () =>
      dispatch({
        type: 'ADD_TOAST',
        variant: 'error',
        message: 'Deletion failed - try again later',
      }),
  })

  return (
    <Modal hasCloseButton onClose={onClose}>
      <ModalHeading>Delete Modal</ModalHeading>

      <p>
        Are you sure you want to delete the memory <strong>{memory.title}</strong>?
      </p>

      <ButtonWrapper>
        <Button disabled={status === 'loading'} variant="primary" onClick={handleDelete}>
          Delete
        </Button>

        <Button disabled={status === 'loading'} variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ButtonWrapper>
    </Modal>
  )
}

// TODO: Replace the global Modal with this one eventually
function Modal({ children, hasCloseButton, onClose }) {
  function handleKeyup(e) {
    if (e.keyCode === 27) onClose()
  }

  /*
    On mount:
    1. Add escape key listener
    2. Set overflow hidden on the html element
  */
  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyup, false)
    document.querySelector('html').setAttribute('style', 'overflow-y: hidden; height: 100vh;')
    // eslint-disable-next-line
  }, [])

  /*
    On unmount:
    1. Remove escape keyup listener
    2. Set overflow to initial on the html element
  */
  React.useEffect(() => {
    return () => {
      document.querySelector('html').setAttribute('style', 'overflow: unset')
      window.removeEventListener('keyup', handleKeyup, false)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="Modal" role="dialog" aria-modal="true">
        <FocusLock className="Modal-content">
          {children}

          {hasCloseButton ? (
            <button className="Modal-close" onClick={onClose}>
              <FaTimes aria-hidden="true" />
              <ScreenReaderOnly>Close Dialog</ScreenReaderOnly>
            </button>
          ) : null}
        </FocusLock>
      </div>

      <div className="Modal-overlay" onClick={onClose} />
    </>
  )
}

function ModalHeading({ children }) {
  return <h3 className="Modal-heading">{children}</h3>
}
