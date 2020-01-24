import React, { useEffect } from 'react'
import Parse from 'parse'
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProtectedRoute from '../components/ProtectedRoute'
import ErrorBoundary from '../components/ErrorBoundary'
import { ToastPortal, ToastList } from '../components/Toast'
import IndexPage from '../pages/IndexPage'
import NotFoundPage from '../pages/NotFoundPage'
import MemoriesPage from '../pages/MemoriesPage'
import AddMemoryPage from '../pages/AddMemoryPage'
import AddMemorySuccessPage from '../pages/AddMemorySuccessPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import { useUser } from '../context'
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
            <Route exact path="/" component={IndexPage} />

            <Route path="/signup" component={SignupPage} />

            <Route path="/login" component={LoginPage} />

            <ProtectedRoute path="/memories">
              <MemoriesPage />
            </ProtectedRoute>

            <ProtectedRoute path="/addmemory">
              <AddMemoryPage />
            </ProtectedRoute>

            <ProtectedRoute path="/addmemorysuccess">
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
