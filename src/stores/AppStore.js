import { observable, action } from 'mobx'

const AppStore = observable({
  isLoading: false,
})

AppStore.setLoading = action(function setLoading() {
  AppStore.isLoading = true
})

AppStore.unsetLoading = action(function unsetLoading() {
  AppStore.isLoading = false
})

export default AppStore
