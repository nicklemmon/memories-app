import Parse from 'parse'

export function signUp() {}

export function logIn() {}

export function logOut() {}

export function getUser() {}

export function getMemories() {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)
  query.limit(1000)

  return query
    .find()
    .then(res => parseResponse(res))
    .catch(err => err)
}

export function getMemory() {}

export function updateMemory(memory) {
  const { title, summary, recordedDate, tags } = memory
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memory.objectId).then(object => {
    if (title) object.set('title', title)
    if (summary) object.set('summary', summary)
    if (recordedDate) object.set('recordedDate', recordedDate)
    if (tags) object.set('tags', tags)

    return object
      .save()
      .then(res => res)
      .catch(err => err)
  })
}

export function createMemory() {}

export function deleteMemory(memoryId) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memoryId).then(obj => obj.destroy())
}

function parseResponse(res) {
  return JSON.parse(JSON.stringify(res))
}
