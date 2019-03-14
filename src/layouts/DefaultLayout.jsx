import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import IndexPage from '../pages/index.jsx'
import NotFoundPage from '../pages/404.jsx'
import MemoriesPage from '../pages/memories.jsx'
import AddMemoryPage from '../pages/addmemory.jsx'
import LoginPage from '../pages/login.jsx'
import SignupPage from '../pages/signup.jsx'

import './DefaultLayout.css'

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className='Layout'>
        <Header classNames='Layout-header' />

        <main className='Layout-main'>
          { this.props.children }

          <Switch>
            <Route exact path='/' component={ IndexPage } />

            <Route path='/memories' render={ () => <MemoriesPage/> } />

            <Route
              path='/signup'
              render={ () => <SignupPage/> }
            />

            <Route path='/addmemory' component={ AddMemoryPage }/>

            <Route
              path='/login'
              render={ () => <LoginPage/> }
            />

            <Route path='*' component={ NotFoundPage }/>
          </Switch>
        </main>

        <Footer classNames='Layout-footer'/>
      </div>
    )
  }
}

export default DefaultLayout
