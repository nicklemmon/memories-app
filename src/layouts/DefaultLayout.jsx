import React from 'react'
import Helmet from 'react-helmet'
import { Switch, Route } from 'react-router-dom';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import IndexPage from '../pages/index.jsx'
import NotFoundPage from '../pages/404.jsx'
import MemoriesPage from '../pages/memories.jsx'
import AddMemoryPage from '../pages/addmemory.jsx'
import CallbackPage from '../pages/callback.jsx'

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
        
        <Header classNames='Layout-header' { ...this.props } />

        <main className='Layout-main'>
          { this.props.children }

          <Switch>
            <Route exact path='/' render = { () => {
              return <IndexPage { ...this.props } />
            }}/>

            <Route path='/memories' render={ () => {
              return <MemoriesPage { ...this.props } />
            }}/>

            { this.props.auth.isAuthenticated() &&
              <Route path='/addmemory' component={ AddMemoryPage } { ...this.props }/>
            }
            
            <Route path='/callback' render={ ( props ) => {
              return <CallbackPage { ...props } /> 
            }}/>

            <Route path='*' component={ NotFoundPage }/>
          </Switch>
        </main>

        <Footer classNames='Layout-footer'/>
      </div>
    )
  }
}

export default DefaultLayout
