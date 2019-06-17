import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content'
import PageHeading from '../components/PageHeading'
import MemoryGrid from '../components/MemoryGrid'

class MemoriesPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title='Memories' />

        <PageHeading content='Memories'/>

        <Content>
          <MemoryGrid/>
        </Content>
      </div>
    )
  }
}

export default MemoriesPage
