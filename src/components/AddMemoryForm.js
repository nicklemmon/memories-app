import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { createMemory } from 'src/helpers/api'
import { valueToDate } from 'src/helpers/date'
import { useToast } from 'src/context'
import FormGroup from './FormGroup'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'

const MAX_TAGS = 3

const initialState = {
  title: '',
  recordedDate: '',
  summary: '',
  tags: [],
  tagMaxReached: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'VALUE_CHANGE': {
      const { name, value } = action

      return {
        ...state,
        [name]: value,
      }
    }

    case 'TAG_VALUE_CHANGE': {
      const { value, tagIndex } = action

      return {
        ...state,
        tags: state.tags.map((tag, index) => {
          if (index === tagIndex) return { name: value }

          return tag
        }),
      }
    }

    case 'ADD_TAG': {
      return {
        ...state,
        tags: state.tags.concat([{ name: '' }]),
      }
    }

    case 'REMOVE_TAG': {
      return {
        ...state,
        tags: state.tags.filter((tag, index) => index !== action.tagIndex),
      }
    }

    default: {
      throw new Error(`${action.type} is not supported by AddMemoryForm`)
    }
  }
}

export default function AddMemoryForm() {
  const history = useHistory()
  const [state, dispatch] = React.useReducer(reducer, initialState)
  // eslint-disable-next-line
  const [toastState, toastDispatch] = useToast()
  const [handleAdd, { status }] = useMutation(
    () =>
      createMemory({
        title: state.title,
        recordedDate: valueToDate(state.recordedDate),
        summary: state.summary,
        tags: state.tags.filter(tag => tag.name.length > 0), // No need to submit empty tag values
      }),
    {
      onSuccess: data => {
        history.push(`/addmemorysuccess/${data.id}`)
        toastDispatch({ type: 'ADD_TOAST', variant: 'success', message: 'Memory added' })
      },
      onError: () => {
        toastDispatch({
          type: 'ADD_TOAST',
          variant: 'error',
          message: 'Memory creation failed',
        })
      },
    },
  )

  function handleChange(e) {
    return dispatch({ type: 'VALUE_CHANGE', name: e.target.name, value: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    return handleAdd()
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Title"
        type="text"
        id="title"
        handleChange={handleChange}
        value={state.title}
        disabled={state === 'loading'}
      />

      <FormGroup
        label="Memory Date"
        type="date"
        id="recordedDate"
        name="recordedDate"
        handleChange={handleChange}
        value={state.recordedDate}
        disabled={state === 'loading'}
      />

      <FormGroup
        label="Summary"
        type="text"
        id="summary"
        name="summary"
        handleChange={handleChange}
        value={state.summary}
        disabled={state === 'loading'}
      />

      {state.tags.map((tag, tagIndex) => {
        return (
          <FormGroup
            key={`tag-field-${tagIndex}`}
            id={`tag-field-${tagIndex}`}
            label={`Tag ${tagIndex + 1}`}
            handleChange={e =>
              dispatch({ type: 'TAG_VALUE_CHANGE', value: e.target.value, tagIndex })
            }
            value={tag.name}
            buttonContent="Remove"
            buttonOnClick={() => dispatch({ type: 'REMOVE_TAG', tagIndex })}
            disabled={status === 'loading'}
          />
        )
      })}

      <ButtonWrapper>
        {state.tags.length === MAX_TAGS ? (
          <p>Maximum of 3 tags per memory.</p>
        ) : (
          <Button
            variant="tertiary"
            onClick={() => dispatch({ type: 'ADD_TAG' })}
            fullWidth
            disabled={status === 'loading'}
          >
            {state.tags.length >= 1 ? 'Add Another Tag' : 'Add Tag'}
          </Button>
        )}
      </ButtonWrapper>

      <ButtonWrapper>
        <Button variant="primary" fullWidth type="submit" disabled={status === 'loading'}>
          Add Memory
        </Button>
      </ButtonWrapper>
    </form>
  )
}
