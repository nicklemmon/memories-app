import React, { useEffect } from 'react'
import Parse from 'parse'
import { Switch, Route, withRouter } from 'react-router-dom'
import {
  Header,
  Footer,
  ProtectedRoute,
  ErrorBoundary,
  ToastPortal,
  ToastList,
} from 'src/components'
import {
  IndexPage,
  NotFoundPage,
  MemoriesPage,
  AddMemoryPage,
  AddMemorySuccessPage,
  LoginPage,
} from 'src/pages'
import { useUser } from 'src/context'
import './DefaultLayout.css'

function DefaultLayout() {
  // eslint-disable-next-line
  const [userState, userDispatch] = useUser()
  const user = Parse.User.current()

  useEffect(() => {
    if (user) userDispatch({ type: 'LOGGED_IN' })
  }, [user, userDispatch])

  return (
    <div className="Layout">
      <Header classNames="Layout-header" />

      <main className="Layout-main">
        <ErrorBoundary>
          <Switch>
            <Route exact path="/">
              <IndexPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <ProtectedRoute path="/memories">
              <MemoriesPage />
            </ProtectedRoute>

            <ProtectedRoute path="/addmemory">
              <AddMemoryPage />
            </ProtectedRoute>

            <ProtectedRoute path="/addmemorysuccess/:id">
              <AddMemorySuccessPage />
            </ProtectedRoute>

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ErrorBoundary>
      </main>

      <Footer classNames="Layout-footer" />

      <ToastPortal>
        <ToastList />
      </ToastPortal>
    </div>
  )
}

export default withRouter(DefaultLayout)
