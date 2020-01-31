/* eslint-disable */
import { Machine, assign } from 'xstate'
import Parse from 'parse'

const memoriesMachine = Machine({
  id: 'memories',
  initial: 'idle',
  context: {
    memories: [],
    toast: undefined,
  },
  states: {
    idle: {
      on: {
        GET_MEMORIES: 'loading',
        DELETE_MEMORY: {
          target: 'loading',
          actions: {},
        },
        DELETE_MEMORY_SUCCEEDED: {},
        EDIT_MEMORY_SUCCEEDED: {
          target: 'loading',
          actions: assign({
            toast: {
              variant: 'success',
              content: 'Memory successfully updated.',
            },
          }),
        },
        EDIT_MEMORY_FAILED: {
          target: 'idle',
          actions: assign({ toast: { variant: 'error', content: 'Memory failed to be updated.' } }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'getMemories',
        src: () => getMemories(),
        onDone: {
          target: 'idle',
          actions: assign({ memories: (ctx, event) => JSON.parse(JSON.stringify(event.data)) }),
        },
        onError: {
          target: 'error',
          actions: assign({ memories: [] }),
        },
      },
    },
    error: {
      on: { FETCH: { target: 'loading' } },
    },
  },
})

function getMemories() {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  query.limit(1000)

  return query.find()
}

function deleteMemory(memoryID) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memoryID).then(obj => {
    obj.destroy()
  })
}

export default memoriesMachine
