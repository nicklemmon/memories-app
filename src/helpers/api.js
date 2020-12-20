import Parse from 'parse'

export function signUp({ username, email, password }) {
  const user = new Parse.User()

  user.set('username', username)
  user.set('email', email)
  user.set('password', password)

  return user.signUp()
}

export function logIn({ username, password }) {
  return Parse.User.logIn(username, password)
}

export function logOut() {
  return Parse.User.logOut()
}

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

export function getMemory(id) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  query.equalTo('objectId', id)

  return query
    .first()
    .then(res => parseResponse(res))
    .catch(err => err)
}

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

export function createMemory(memory) {
  const { title, summary, tags, recordedDate } = memory
  const Memory = Parse.Object.extend('memory')
  const object = new Memory()

  object.set('title', title)
  object.set('summary', summary)
  object.set('tags', tags)
  object.set('recordedDate', recordedDate)

  return object.save()
}

export function deleteMemory(memoryId) {
  const Memory = Parse.Object.extend('memory')
  const query = new Parse.Query(Memory)

  return query.get(memoryId).then(obj => obj.destroy())
}

function parseResponse(res) {
  return JSON.parse(JSON.stringify(res))
}
