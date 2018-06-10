import React from 'react'

import Content from '../components/Content.jsx'
import PageHeading from '../components/PageHeading.jsx'
import FormAddMemory from '../components/FormAddMemory.jsx'

class AddMemoryPage extends React.Component {
  render() {
    return (
      <div>
        <PageHeading content='Add a Memory'/>

        <Content>
          <FormAddMemory/>
        </Content>
      </div>
    )
  }
}

export default AddMemoryPage