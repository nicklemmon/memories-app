import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageLoader from '../components/PageLoader'

import IndexPage from '../pages/index'
import NotFoundPage from '../pages/404'
import MemoriesPage from '../pages/memories'
import AddMemoryPage from '../pages/addmemory'
import AddMemorySuccessPage from '../pages/addmemorysuccess'
import LoginPage from '../pages/login'
import SignupPage from '../pages/signup'

import './DefaultLayout.css'

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className='Layout'>
        <Header classNames='Layout-header' />

        { this.props.appState.isLoading && <PageLoader /> }

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

            <Route path='/addmemorysuccess' component={ AddMemorySuccessPage }/>

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

export default inject( 'appState' )( observer( DefaultLayout ) )
