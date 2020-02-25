import { Machine, assign, spawn } from 'xstate'
import Parse from 'parse'
import memoryMachine from './memoryMachine'

const memoriesMachine = Machine({
  id: 'memories',
  initial: 'idle',
  context: {
    memories: [],
    memoryToEdit: {},
    toast: undefined,
  },
  states: {
    idle: {
      on: {
        GET_MEMORIES: 'loading',
        MEMORY_EDITED: 'loading',
        DELETE_MEMORY: 'deleting',
        OPEN_DELETE_MODAL: 'deleteModalOpen',
        OPEN_EDIT_MODAL: 'editModalOpen',
        MEMORY_DELETED: {
          target: 'loading',
          actions: assign({ toast: { variant: 'success', content: 'Memory deleted.' } }),
        },
      },
    },
    editModalOpen: {
      initial: 'loading',
      on: {
        CLOSE_MODAL: 'idle',
        EDIT_MEMORY: 'editing',
      },
      states: {
        idle: {},
        error: {},
        loading: {
          invoke: {
            id: 'getMemory',
            src: (ctx, event) => {
              return getMemory(event.data.id)
            },
            onDone: {
              target: 'idle',
              actions: assign({
                memoryToEdit: (ctx, event) => JSON.parse(JSON.stringify(event.data)),
              }),
            },
            onError: {
              target: 'error',
            },
          },
        },
      },
    },
    deleteModalOpen: {
      on: {
        CLOSE_MODAL: 'idle',
        DELETE_MEMORY: 'deleting',
      },
    },
    editing: {
      invoke: {
        id: 'editMemory',
        src: (ctx, event) => {
          const { data } = event
          const { id, content } = data

          return editMemory(id, content)
        },
        onDone: {
          target: 'loading',
          actions: assign({ toast: { variant: 'success', content: 'Memory edited.' } }),
        },
        onError: {
          target: 'loading',
          actions: assign({ toast: { variant: 'error', content: 'Editing memory failed.' } }),
        },
      },
    },
    deleting: {
      invoke: {
        id: 'deleteMemory',
        src: (ctx, event) => {
          return deleteMemory(event.data)
        },
        onDone: {
          target: 'loading',
          actions: assign({ toast: { variant: 'success', content: 'Memory deleted.' } }),
        },
        onError: {
          target: 'loading',
          actions: assign({ toast: { variant: 'error', content: 'Memory failed to delete.' } }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'getMemories',
        src: () => {
          return getMemories()
        },
        onDone: {
          target: 'idle',
          actions: assign({
            memories: (ctx, event) => {
              const memories = JSON.parse(JSON.stringify(event.data))

              return memories.map(memory => ({
                ...memory,
                ref: spawn(memoryMachine.withContext(memory)),
              }))
            },
          }),
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

function getMemory(memoryID) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memoryID)
}

function deleteMemory(memoryID) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memoryID).then(obj => {
    return obj.destroy()
  })
}

function editMemory(memoryID, content) {
  const { title, summary } = content
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memoryID).then(object => {
    object.set('title', title)
    object.set('summary', summary)

    return object.save()
  })
}

export default memoriesMachine
