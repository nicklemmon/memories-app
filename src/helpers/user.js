import Parse from 'parse'

export function getCurrentUser() {
  return Parse.User.current()
}
