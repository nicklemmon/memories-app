import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import MemoryGrid from '../components/MemoryGrid.jsx'
import ModalDeleteMemory from '../components/ModalDeleteMemory.jsx'

class MemoriesPage extends React.Component {
  render() {
    return (
      <div>
        <ModalDeleteMemory/>

        <PageHeading content='Memories'/>

        <Content>
          <MemoryGrid/>
        </Content>
      </div>
    )
  }
}

export default MemoriesPage