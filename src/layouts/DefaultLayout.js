import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IndexPage from '../pages/index'
import NotFoundPage from '../pages/404'
import MemoriesPage from '../pages/memories'
import AddMemoryPage from '../pages/addmemory'
import AddMemorySuccessPage from '../pages/addmemorysuccess'
import LoginPage from '../pages/login'
import SignupPage from '../pages/signup'
import './DefaultLayout.css'

function DefaultLayout(props) {
  return (
    <div className="Layout">
      <Header classNames="Layout-header" />

      <main className="Layout-main">
        {props.children}

        <Switch>
          <Route exact path="/" component={IndexPage} />

          <Route path="/memories" component={MemoriesPage} />

          <Route path="/signup" component={SignupPage} />

          <Route path="/addmemory" component={AddMemoryPage} />

          <Route path="/addmemorysuccess" component={AddMemorySuccessPage} />

          <Route path="/login" component={LoginPage} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>

      <Footer classNames="Layout-footer" />
    </div>
  )
}

export default withRouter(DefaultLayout)
