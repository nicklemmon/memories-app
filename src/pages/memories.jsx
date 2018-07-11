import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import MemoryGrid from '../components/MemoryGrid.jsx'

class MemoriesPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Memories'/>

        <Content>
          <MemoryGrid { ...this.props }/>
        </Content>
      </div>
    )
  }
}

export default MemoriesPage