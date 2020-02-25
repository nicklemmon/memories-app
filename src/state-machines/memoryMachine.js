import { Machine, assign, sendParent } from 'xstate'
import Parse from 'parse'

const memoryMachine = Machine({
  id: 'memory',
  initial: 'idle',
  context: {
    objectId: '',
    recordedDate: '',
    title: '',
    summary: '',
    tags: [],
    toast: undefined,
  },
  states: {
    idle: {
      on: {
        OPEN_DELETE_MODAL: 'deleteModalOpen',
        OPEN_EDIT_MODAL: 'editModalOpen',
      },
    },
    editLoading: {
      invoke: {
        id: 'getMemory',
        src: ctx => {
          return getMemory(ctx.objectId)
        },
        onDone: {
          target: 'editModalOpen',
          actions: assign({
            memoryToEdit: (ctx, event) => JSON.parse(JSON.stringify(event.data)),
          }),
        },
        onError: 'error',
      },
    },
    editModalOpen: {
      on: {
        CLOSE_MODAL: 'idle',
        EDIT_MEMORY: 'editing',
      },
    },
    deleteModalOpen: {
      on: {
        CLOSE_MODAL: 'idle',
        DELETE_MEMORY: 'deleting',
      },
    },
    error: {},
    deleting: {
      invoke: {
        id: 'deleteMemory',
        src: ctx => {
          return deleteMemory(ctx.objectId)
        },
        onDone: {
          target: 'idle',
          actions: sendParent('MEMORY_DELETED'),
        },
        onError: 'error',
      },
    },
    deleteLoading: {
      invoke: {
        id: 'getMemory',
        src: ctx => {
          return getMemory(ctx.objectId)
        },
        onDone: {
          target: 'deleteModalOpen',
          actions: assign({
            memoryToEdit: (ctx, event) => JSON.parse(JSON.stringify(event.data)),
          }),
        },
        onError: 'error',
      },
    },
    editing: {},
  },
})

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

/* eslint-disable */
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

export default memoryMachine
