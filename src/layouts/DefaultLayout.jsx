import React from 'react'
import Helmet from 'react-helmet'
import { Switch, Route } from 'react-router-dom';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PrivateRoute from '../components/PrivateRoute.jsx'

import IndexPage from '../pages/index.jsx'
import NotFoundPage from '../pages/404.jsx'
import MemoriesPage from '../pages/memories.jsx'
import AddMemoryPage from '../pages/addmemory.jsx'
import SigninPage from '../pages/signin.jsx'
import SignupPage from '../pages/signup.jsx'

import './DefaultLayout.css'

class DefaultLayout extends React.Component {
  render() {
    return(
      <div className='Layout'>
        <Helmet
          title="Memories"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        
        <Header classNames='Layout-header'/>

        <main className='Layout-main'>
          { this.props.children }

          <Switch>
            <Route exact path='/' component={ IndexPage }/>

            <Route path='/memories' component={ MemoriesPage }/>

            <Route path='/signup' component={ SignupPage }/>

            <Route path='/signin' component={ SigninPage }/>

            <PrivateRoute path='/addmemory' component={ AddMemoryPage }/>

            <Route path='*' component={ NotFoundPage }/>
          </Switch>
        </main>

        <Footer classNames='Layout-footer'/>
      </div>
    )
  }
}

export default DefaultLayout
